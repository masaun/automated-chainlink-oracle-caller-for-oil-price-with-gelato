pragma solidity =0.6.6;

/***
 * @notice - This is a sample code in Gelato: https://docs.gelato.network/creating-an-automated-dapp
 * @notice - This is simplified version
 * @notice - Full code is here: https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol  
 **/
contract ActionUniswapV2Trade {

    ... 
    
    function action(
        address _sellToken,
        uint256 _sellAmount,
        address _buyToken,
        uint256 _minBuyAmount,
        address _receiver,
        address _origin
    )
        public
        virtual
        delegatecallOnly("ActionKyberTrade.action")
    {
        address receiver = _receiver == address(0) ? address(this) : _receiver;

        address buyToken = _buyToken;

        // If sellToken == ETH, wrap ETH to WETH
        // IF ETH, we assume the proxy already has ETH and we dont transferFrom it
        if (_sellToken == ETH_ADDRESS) {
            _sellToken = address(WETH);
            WETH.deposit{value: _sellAmount}();
        } else {
            if (_origin != address(0) && _origin != address(this)) {
                IERC20(_sellToken).safeTransferFrom(
                    _origin, address(this), _sellAmount, "ActionUniswapV2Trade.safeTransferFrom"
                );
            }
        }

        IERC20 sellToken = IERC20(_sellToken);

        // Uniswap only knows WETH
        if(_buyToken == ETH_ADDRESS) buyToken = address(WETH);

        address[] memory tokenPath = getPaths(_sellToken, buyToken);

        // UserProxy approves Uniswap Router
        sellToken.safeIncreaseAllowance(
            address(uniRouter), _sellAmount, "ActionUniswapV2Trade.safeIncreaseAllowance"
        );

        require(sellToken.allowance(address(this), address(uniRouter)) >= _sellAmount, "Invalid token allowance");

        uint256 buyAmount;
        try uniRouter.swapExactTokensForTokens(
            _sellAmount,
            _minBuyAmount,
            tokenPath,
            address(this),
            now + 1
        ) returns (uint256[] memory buyAmounts) {
            buyAmount = buyAmounts[1];
        } catch {
            revert("ActionUniswapV2Trade.action: trade with ERC20 Error");
        }


        // If sellToken == ETH, unwrap WETH to ETH
        if (_buyToken == ETH_ADDRESS) {
            WETH.withdraw(buyAmount);
            if (receiver != address(this)) payable(receiver).sendValue(buyAmount);
        } else if (receiver != address(this)) IERC20(_buyToken).safeTransfer(receiver, buyAmount, "ActionUniswapV2Trade.safeTransfer");

        emit LogGelatoUniswapTrade(
            _sellToken,
            _sellAmount,
            _buyToken,
            _minBuyAmount,
            buyAmount,
            receiver,
            _origin
        );
    }

}
