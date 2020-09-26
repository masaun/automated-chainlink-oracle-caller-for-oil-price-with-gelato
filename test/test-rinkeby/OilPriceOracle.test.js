require('dotenv').config();

const Web3 = require('web3');
//const web3 = new Web3(`https://rinkeby.infura.io/v3/${ process.env.INFURA_KEY }`);
const web3 = new Web3("https://rinkeby.infura.io/v3/34ed41c4cf28406885f032930d670036");

let OilPriceOracle = {};
OilPriceOracle = require("../build/contracts/OilPriceOracle.json");


/***
 * @dev - [Execution]: $ truffle test ./test/OilPriceOracle.test.js --network rinkeby
 **/
contract("OilPriceOracle", function(accounts) {

    const oilPriceOracleABI = OilPriceOracle.abi;
    //const oilPriceOracleAddr = "0x22aaeEd33532cE99C6601C3A49ae5384727E5Dd0";  /// [Note]: Need to send ETH and LINK into this contract address at first
    const oilPriceOracleAddr = OilPriceOracle["networks"]["4"]["address"];       /// [Note]: Need to send ETH and LINK at first into this contract address
    const oilPriceOracle = new web3.eth.Contract(oilPriceOracleABI, oilPriceOracleAddr);
    
    it('Call getLatestPrice() of OilPriceOracle contract', async () => {
        let roundData = await oilPriceOracle.methods.getLatestPrice().call();
        console.log("=== Latest Round Data ===", roundData)

        // oilPriceOracle.methods.getLatestPrice().call()
        //     .then((roundData) => {
        //         // Do something with roundData
        //         console.log("Latest Round Data", roundData)
        //     });
    });

});



