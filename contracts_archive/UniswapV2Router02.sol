pragma solidity =0.6.6;

/***
 * @notice - This is a sample code in Gelato: https://docs.gelato.network/creating-an-automated-dapp
 * @notice - This is simplified version of UniswapV2Router02.sol
 * @notice - Full code is here: https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol  
 **/

contract UniswapV2Router02 {

    ...
    
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external 
      virtual 
      override 
      ensure(deadline) 
      returns (uint[] memory amounts) 
    {
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }

}
