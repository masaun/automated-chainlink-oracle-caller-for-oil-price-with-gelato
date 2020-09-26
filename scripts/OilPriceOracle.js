require('dotenv').config();

const Web3 = require('web3');
//const web3 = new Web3("https://rinkeby.infura.io/v3/34ed41c4cf28406885f032930d670036");
const web3 = new Web3(`https://rinkeby.infura.io/v3/${ process.env.INFURA_KEY }`);

let OilPriceOracle = {};
OilPriceOracle = require("../build/contracts/OilPriceOracle.json");

const oilPriceOracleABI = OilPriceOracle.abi;
//const oilPriceOracleAddr = "0x22aaeEd33532cE99C6601C3A49ae5384727E5Dd0";   /// [Note]: Need to send ETH and LINK at first into this contract address
const oilPriceOracleAddr = OilPriceOracle["networks"]["4"]["address"];       /// [Note]: Need to send ETH and LINK at first into this contract address
const oilPriceOracle = new web3.eth.Contract(oilPriceOracleABI, oilPriceOracleAddr);

//const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
oilPriceOracle.methods.getLatestPrice().call()
    .then((roundData) => {
        // Do something with roundData
        console.log("Latest Round Data", roundData)
    });




// async function callTx() {
//     async function getLatestPrice() {
//         let roundData;
//         try {
//             roundData = await oilPriceOracle.methods.getLatestPrice().call();
//             console.log("=== Latest Round Data 1 ===", roundData);
//         } catch(e) {
//             console.log('=== e ===', e);
//             return String(e);
//         }

//         return roundData;
//     }

//     let _roundData = await getLatestPrice();
//     return _roundData;
// }

// let roundData = callTx()
// console.log("=== Latest Round Data 2 ===", roundData);

