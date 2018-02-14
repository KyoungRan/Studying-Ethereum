<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>MyDapp</title>
  <script src="web3.js/dist/web3.min.js"></script>
  <script type="text/javascript">
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  </script>
</head>
<body>
  <h1>Interact with a contract</h1>

  <button onclick="getCounter()">Update Counter</button>
  <button onclick="increaseCounter()">Increase Counter</button>

  <span id="myCounter"></span> Counter
</body>
</html>