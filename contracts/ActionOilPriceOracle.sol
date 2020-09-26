// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.6.10 and less than 0.7.0
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { GelatoActionsStandard } from "@gelatonetwork/core/contracts/actions/GelatoActionsStandard.sol";
import { OilPriceOracle } from "./OilPriceOracle.sol";
import { DataFlow } from "@gelatonetwork/core/contracts/gelato_core/interfaces/IGelatoCore.sol";
import { GelatoBytes } from "@gelatonetwork/core/contracts/libraries/GelatoBytes.sol";


contract ActionOilPriceOracle is GelatoActionsStandard {
    string public greet;

    OilPriceOracle public immutable oilPriceOracle;

    constructor(OilPriceOracle _oilPriceOracle) public { 
        oilPriceOracle = OilPriceOracle(_oilPriceOracle);
    }

    // ======= ACTION IMPLEMENTATION DETAILS =========
    /// @dev Call OilPriceOracle.getLatestPrice via UserProxy (Delegatecall)
    function action()
        public
        virtual
        //delegatecallOnly("ActionOilPriceOracle.action")
    {
        try oilPriceOracle.getLatestPrice() { 
        } catch Error(string memory error) {
            revert(string(abi.encodePacked("ActionOilPriceOracle.getLatestPrice:", error)));
        } catch {
            revert("ActionOilPriceOracle.action.getLatestPrice: unknown error");
        }
    }

}
