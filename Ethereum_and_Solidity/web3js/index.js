(function() {
  var provider = new Web3.providers.HttpProvider("http://localhost:8545");
  var web3 = new Web3(provider);
  
  var contract = web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        }
      ],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at('0x08a7da6da10a34ed5be22f778df9dd5f58601235');

  var name = "이순신";
  var salary = contract.get(name);

  console.log(name, salary.toString(10));
})();