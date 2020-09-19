/***
 * @notice - Example of a .Delegatecall action which calls the function above:
 *         - https://docs.gelato.network/creating-an-automated-dapp
 **/

const ethers = require("ethers");
const GelatoCoreLib = require("@gelatonetwork/core");

// Address of ActionUniswapV2Trade.sol
const actionAddress = "0x926Ef4Fe67B8d88d2cC2E109B6b7fae4A92cB1c1"
const actionAbi = [
    "function action(
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _minBuyAmount,
        address _receiver,
        address _origin
    )"
]
const iFace = new ethers.utils.Interface(actionAbi)

// #### Create the action object
const action = new GelatoCoreLib.Action({
    addr: actionAddress,
    data: iFace.encodeFunctionData("action", [
        "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        1000000000000000,
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        5000000000000000,
        "0x2464e6E2c963CC1810FAF7c2B3205819C93833f7",
        "0x0000000000000000000000000000000000000000"
    ]),
    operation: GelatoCoreLib.Operation.Delegatecall,
    dataFlow: GelatoCoreLib.DataFlow.None,
    value: 0,
    termsOkCheck: true
})
