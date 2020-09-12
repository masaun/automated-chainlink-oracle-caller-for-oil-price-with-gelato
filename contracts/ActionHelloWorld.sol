// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.6.10 and less than 0.7.0
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { GelatoActionsStandard } from "@gelatonetwork/core/contracts/actions/GelatoActionsStandard.sol";
import { HelloWorld } from "./HelloWorld.sol";
import { DataFlow } from "@gelatonetwork/core/contracts/gelato_core/interfaces/IGelatoCore.sol";
import { GelatoBytes } from "@gelatonetwork/core/contracts/libraries/GelatoBytes.sol";


contract ActionHelloWorld is GelatoActionsStandard {
    string public greet;

    function addNewGreetMessage(string memory newMessage) public returns (string memory _greeet) {
        greet = newMessage;
        return greet;
    }

    function getGreetMessage() public view returns (string memory _greeet) {
        return greet;
    }
}
