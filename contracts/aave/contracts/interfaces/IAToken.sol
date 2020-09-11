pragma solidity 0.5.16;

interface IAToken {
    function redeem(uint256 amount) external;

    function balanceOf(address _user) external view returns (uint256);
    function principalBalanceOf(address _user) external view returns (uint256);
}
