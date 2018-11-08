var express = require('express')
var app = express()
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))
var Tx = require('ethereumjs-tx')

var mysql = require('mysql')

const send_account = 'SEND_ACCOUNT'
const receiver_account = 'RECEIVER_ACCOUNT'
const privateKey = Buffer.from('PRIVATEKEY', 'hex')

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'USER',
  password: 'PASSWORD',
  database: 'blockchain'
})

conn.connect()

var solc = require('solc')
var fs = require('fs')

app.get('/smartcontract', function(req, res) {
  // file read
  var id = 1
  var source = fs.readFileSync('../ethereum/contracts/HelloWorld.sol', 'utf8')
  console.log('transaction...compiling contract ....')

  let compiledContract = solc.compile(source)
  console.log('done!' + compiledContract)

  var bytecode = ''
  var abi = ''

  for (let contractName in compiledContract.contracts) {
    // code and ABIT that are needed by web3
    abi = JSON.parse(compiledContract.contracts[contractName].interface)
    bytecode = compiledContract.contracts[contractName].bytecode
    // save contract json file
  }
  console.log(abi)

  var sql = `SELECT contract_address
              FROM tx_hash WHERE id=?`
  conn.query(sql, [id], function (err, contract) {
    console.log('Contract Address', contract[0].contract_address)

    const MyContract = new web3.eth.Contract(abi, contract[0].contract_address)

    MyContract.methods.say().call().then(result => console.log('SmartContract Call: ' + result))

    web3.eth.getTransactionCount(send_account, (err, txCount) => {
      
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contract[0].contract_address,
        data: MyContract.methods.setcontract('Smart Contract Hello').encodeABI()
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
          MyContract.methods.say().call().then(result => console.log("SmartContract Call: " + result))
        }).on('error', console.error)
    })
  })
})

// listen
app.listen(4000, function() {
  console.log('Connected BlockChain, 4000 port!!')
})