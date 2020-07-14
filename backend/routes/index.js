const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const ipfs = require('../services/ipfs');
const axios = require("axios");
const abi = require('../abi.json');
const constants = require('../constants.json');

const web3 = new Web3(constants.rpc_server);
let contract;

const data = [];

web3.eth.getAccounts().then(async accounts => {
  web3.eth.defaultAccount = accounts[0];
  contract = new web3.eth.Contract(abi, constants.address);
  const balance = await web3.eth.getBalance(web3.eth.defaultAccount);

  console.log("Setting default account to", web3.eth.defaultAccount);
  console.log("Balance", balance);
});

/**
 * Issue token
 */
router.get('/issueToken', async (req, res) => {
  try {
    if (!req.query.address) {
      throw new Error('Reviewer address is required');
    }
    const { address } = req.query;
    const gas = await contract.methods.IssueToken(address).estimateGas({ from: web3.eth.defaultAccount });
    const result = await contract.methods.IssueToken(address).send({ from: web3.eth.defaultAccount, gas });
    const { events: { TokenCreated: { returnValues: { tokenNo } } } } = result;
    res.send({ tokenNo: String(tokenNo) });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
});

/**
 * Review complete
 */
router.get('/review', async (req, res) => {
  try {
    if (!req.query.address || !req.query.token || !req.query.comment) {
      throw new Error('All params are required');
    }
    const { address, token, comment } = req.query;
    const ipfsHash = await ipfs.add(Buffer.from(comment));

    const gas = await contract.methods.reviewDone(
      address,
      ipfsHash[0].hash,
      token,
    ).estimateGas({ from: web3.eth.defaultAccount });

    const result = await contract.methods.reviewDone(
      address,
      ipfsHash[0].hash,
      token,
    ).send({ from: web3.eth.defaultAccount, gas });

    const { events: { LogErr, LogSent } } = result;

    if (!!LogErr && !!LogErr.returnValues) {
      const { amount, balance, text } = LogErr.returnValues;
      if (Number(amount) > Number(balance)) {
        throw new Error("Balance insufficient");
      }
      throw new Error("Error");
    }

    if (!!LogSent) {
      res.send(ipfsHash[0].hash);
      return;
    }

    throw new Error("Error");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
});

module.exports = router;
