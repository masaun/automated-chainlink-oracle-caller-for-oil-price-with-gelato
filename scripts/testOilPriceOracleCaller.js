/***
 * @notice - This is sample code which reference from: 
 *         - Doc: https://docs.chain.link/docs/get-the-latest-price#config
 *         - Test running: https://repl.it/@alexroan/GetLatestPriceWeb3JS#index.js
 **/


const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/34ed41c4cf28406885f032930d670036");

const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

/// Aggregator: Oil/USD (on Rinkeby)
const addr = "0x6292aA9a6650aE14fbf974E5029f36F95a1848Fd";  

const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
priceFeed.methods.latestRoundData().call()
    .then((roundData) => {
        // Do something with roundData
        console.log("Latest Round Data", roundData)
    });


/***
 * @dev - Result
 **/
// $ node testOilPriceOracleCaller.js
//
// Latest Round Data Result {
//   '0': '18446744073709554169',
//   '1': '4330688000',
//   '2': '1600642891',
//   '3': '1600642891',
//   '4': '18446744073709554169',
//   roundId: '18446744073709554169',
//   answer: '4330688000',
//   startedAt: '1600642891',
//   updatedAt: '1600642891',
//   answeredInRound: '18446744073709554169' }


