/***
 * @notice - This is sample code which reference from: 
 *         - Doc: https://docs.chain.link/docs/get-the-latest-price#config
 *         - Test running: https://repl.it/@alexroan/GetLatestPriceWeb3JS#index.js
 **/


const Web3 = require('web3');
const web3 = new Web3("https://kovan.infura.io/v3/34ed41c4cf28406885f032930d670036");

const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";

const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
priceFeed.methods.latestRoundData().call()
    .then((roundData) => {
        // Do something with roundData
        console.log("Latest Round Data", roundData)
    });
