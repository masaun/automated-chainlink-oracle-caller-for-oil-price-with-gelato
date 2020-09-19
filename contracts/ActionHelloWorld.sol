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

    HelloWorld public immutable helloWorld;

    constructor(HelloWorld _helloWorld) public { 
        helloWorld = _helloWorld; 
    }

    // ======= ACTION IMPLEMENTATION DETAILS =========
    /// @dev Call HelloWorld.addNewGreetMessage via UserProxy (Delegatecall)
    function action(string memory newMessage)
        public
        virtual
        delegatecallOnly("ActionHelloWorld.action")
    {
        try helloWorld.addNewGreetMessage(newMessage) { 
        } catch Error(string memory error) {
            revert(string(abi.encodePacked("ActionHelloWorld.action.addNewGreetMessage:", error)));
        } catch {
            revert("ActionHelloWorld.action.addNewGreetMessage: unknown error");
        }
    }


}
