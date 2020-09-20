require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(`https://rinkeby.infura.io/v3/${ process.env.INFURA_KEY }`);

let OilPriceOracle = {};
OilPriceOracle = require("../build/contracts/OilPriceOracle.json");

const oilPriceOracleABI = OilPriceOracle.abi;
const oilPriceOracleAddr = "0x22aaeEd33532cE99C6601C3A49ae5384727E5Dd0";
//const oilPriceOracleAddr = OilPriceOracle.address;
const oilPriceOracle = new web3.eth.Contract(oilPriceOracleABI, oilPriceOracleAddr);


async function getLatestPrice() {
    let roundData = await oilPriceOracle.methods.getLatestPrice().call();
    console.log("Latest Round Data", roundData);
}
getLatestPrice()


// oilPriceOracle.methods.getLatestPrice().call()
//     .then((roundData) => {
//         // Do something with roundData
//         console.log("Latest Round Data", roundData)
//     });
