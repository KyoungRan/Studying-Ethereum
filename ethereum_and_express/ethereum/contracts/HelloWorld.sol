pragma solidity ^0.4.23;

contract HelloWorld {
    
    string public greeting;
    
    constructor() public {
        greeting = "Hello, World";
    }
    
    function say() public view returns (string) {
        return greeting;
    }

    function setcontract(string parameter) public {
        greeting = parameter;
    }
}