pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";


contract OilPriceOracle {

    AggregatorV3Interface internal oilPriceFeed;

    /**
     * Network: Rinkeby
     * Aggregator: ETH/USD
     * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
     *
     * Aggregator: Oil/USD
     * Address: 0x6292aA9a6650aE14fbf974E5029f36F95a1848Fd
     */
    constructor() public {
        //priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        oilPriceFeed = AggregatorV3Interface(0x6292aA9a6650aE14fbf974E5029f36F95a1848Fd);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int oilPrice,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = oilPriceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return oilPrice;
    }
}
