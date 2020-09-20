require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(`https://rinkeby.infura.io/v3/${ process.env.INFURA_KEY }`);

let OilPriceOracle = {};
OilPriceOracle = require("../build/contracts/OilPriceOracle.json");


contract("OilPriceOracle", function(accounts) {

    const oilPriceOracleABI = OilPriceOracle.abi;
    const oilPriceOracleAddr = OilPriceOracle.address;
    const oilPriceOracle = new web3.eth.Contract(oilPriceOracleABI, oilPriceOracleAddr);
    

    it('Setup ActionHelloWorld contract instance', async () => {
        oilPriceOracle.methods.getLatestPrice().call()
            .then((roundData) => {
                // Do something with roundData
                console.log("Latest Round Data", roundData)
            });
    });

});



