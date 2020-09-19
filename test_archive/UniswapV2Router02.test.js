/***
 * @notice - Example of a .Call action which calls the function above:
 *         - https://docs.gelato.network/creating-an-automated-dapp
 **/

const ethers = require("ethers");
const GelatoCoreLib = require("@gelatonetwork/core");

// Address of UniswapV2Router2
const actionAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
const actionAbi = [
    "function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) returns (uint256[] memory amounts)"
]
const iFace = new ethers.utils.Interface(actionAbi)

// #### Create the action object
const action = new GelatoCoreLib.Action({
    addr: actionAddress,
    data: iFace.encodeFunctionData("swapExactTokensForTokens", [
        1000000000000000,
        5000000000000000,
        [
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        ],
        "0x2464e6E2c963CC1810FAF7c2B3205819C93833f7",
        1599800000
    ]),
    operation: GelatoCoreLib.Operation.Call,
    dataFlow: GelatoCoreLib.DataFlow.None,
    value: 0,
    termsOkCheck: false
    
})
