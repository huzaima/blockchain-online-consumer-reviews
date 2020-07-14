import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReviewList from './ReviewList';
import { Container, TextField } from '@material-ui/core';
import ReviewForm from './ReviewForm';
import ReviewSuccess from './ReviewSuccess';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '0xa7C4DF4C04046839ba716f408e163fBE14eB9012',
      selected: null,
      success: null,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSelected = product => {
    this.setState({ selected: product });
  };

  handleSuccess = success => {
    this.setState({ success });
  };

  submit = async comment => {
    const { address } = this.state;
    this.handleSelected(null);
    if (!!comment && !!address) {
      const token = (await axios.get('http://localhost:3000/issueToken', { params: { address } })).data.tokenNo;
      const review = (await axios.get('http://localhost:3000/review', { params: { address, token, comment } })).data;
      console.log(review);
      this.handleSuccess(review);
    }
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="sm">
          {this.state.selected && <ReviewForm onSubmit={this.submit} onClose={() => this.handleSelected(null)} />}
          {this.state.success && <ReviewSuccess success={this.state.success} onClose={() => this.handleSuccess(null)} />}
          <TextField
            fullWidth
            value={this.state.address}
            variant="outlined"
            label="Recipient Ethereum Address"
            onChange={this.handleChange('address')}
            style={{ marginTop: 12, marginBottom: 12, }}
          />
          <ReviewList onClick={this.handleSelected} />
        </Container>
      </div>
    );
  }
}

export default App;
