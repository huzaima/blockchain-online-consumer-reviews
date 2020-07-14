const IPFS = require('ipfs-api');
const constants = require('../constants.json');
const { host, port, protocol } = constants.ipfs;
const ipfs = new IPFS({ host, port, protocol });

module.exports = ipfs;