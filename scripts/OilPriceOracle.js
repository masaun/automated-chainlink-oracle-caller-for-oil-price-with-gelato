require('dotenv').config();

const web3 = new Web3(`https://rinkeby.infura.io/v3/${ process.env.INFURA_KEY }`);

let OilPriceOracle = {};
OilPriceOracle = require("../build/contracts/OilPriceOracle.json");

const oilPriceOracleABI = OilPriceOracle.abi;
const oilPriceOracleAddr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
const oilPriceOracle = new web3.eth.Contract(oilPriceOracleABI, oilPriceOracleAddr);
oilPriceOracle.methods.getLatestPrice().call()
    .then((roundData) => {
        // Do something with roundData
        console.log("Latest Round Data", roundData)
    });
