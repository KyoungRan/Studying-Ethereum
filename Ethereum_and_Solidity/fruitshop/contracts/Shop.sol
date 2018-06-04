pragma solidity ^0.4.23;


contract Shop {
    mapping (address=>uint16) myApple;
    constructor() public {
        
    }

    function buyApple() payable external {
        myApple[msg.sender]++;
    }

    function getMyApples() view external returns(uint16) {
        return myApple[msg.sender];
    }

    function sellApple(uint _applePrice) payable external {
        uint refund = (myApple[msg.sender] * _applePrice);
        myApple[msg.sender] = 0;
        msg.sender.transfer(refund);
    }
}
