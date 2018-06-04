import React, { Component } from 'react'
import ShopContract from './../build/contracts/Shop.json';
import getWeb3 from './utils/getWeb3'

import './App.css'

class App extends Component {
  state = {
      shopInstance: null,
      myAccount: null,  
      myApple: 0, 
      web3: null
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require("truffle-contract");
    const shop = contract(ShopContract);
    shop.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts((error, accounts) => {
      if(!error) {
        shop.deployed().then(instance => {
          this.setState({
            shopInstance: instance, myAccount: accounts[0]
          });
          this.updateMyApples();
        })
      }
    })
  }

  buyApple() {
    this.state.shopInstance.buyApple({
      from: this.state.myAccount,
      value: this.state.web3.toWei(10, "ether"),
      gas: 900000
    })
  }

  sellApple() {
    this.state.shopInstance.sellMyApple(this.state.web3.toWei(10, "ether"), {
      from: this.state.myAccount,
      gas: 900000
    })
  }

  updateMyApples() {
    this.state.shopInstance.getMyApples().then(result => {
      this.setState({
        myApples: result.toNumber()
      })
    })
  }
  render() {
    return (
      <div className="App">
        <h1>사과의 가격: 10 ETH</h1>
        <button onClick={() => this.buyApple()}>구매하기</button>
        <p>내가 가진 사과: {this.state.myApples}</p>
        <button onClick={() => this.sellApple()}>
          판매하기 (판매 가격: {10 * this.state.myApples})
        </button>
      </div>
    );
  }
}

export default App
