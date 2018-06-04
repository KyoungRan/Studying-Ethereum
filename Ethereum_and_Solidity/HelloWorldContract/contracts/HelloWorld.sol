pragma solidity ^0.4.18;

contract HelloWorld {
    string hello;

    function HelloWorld() public {
        hello = "Hello World!";
    }

    function setHello(string _hello) public {
        hello = _hello;
    }

    function getHello() public view returns (string) {
        return hello;
    }
}