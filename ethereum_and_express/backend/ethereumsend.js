var express = require('express')
var app = express()
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))
var Tx = require('ethereumjs-tx')

const send_account = 'send_account address'
const receiver_account = 'receiver_account address'
const privateKey = Buffer.from('privateKey', 'hex')

// main
app.get('/', function(req, res) {
  web3.eth.getTransactionCount(send_account, (err, txCount) => {

    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),  // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('7.6', 'gwei')),
      to: receiver_account,
      value: '0x2386f26fc10000' // 0.01 eth 전송 to_hex
    }

    const tx = new Tx(txObject)
    tx.sign(privateKey)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw)
      .once('transactionHash', (hash) => {
        console.info('transactionHash', 'https://ropsten.etherscan.io/tx/' + hash)
      })
      .once('receipt', (receipt) => {
        console.info('receipt', receipt)
      }).on('error', console.error)
  })
})

// listen
app.listen(4000, function() {
  console.log('Connected memo, 4000 port!')
})

