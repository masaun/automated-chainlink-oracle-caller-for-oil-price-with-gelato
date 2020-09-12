// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.6.10 and less than 0.7.0
pragma solidity ^0.6.12;

contract HelloWorld {
    string public greet = "Hello World!";

    function getGreetMessage() public view returns (string memory _greeet) {
        return greet;
    }
    
}
