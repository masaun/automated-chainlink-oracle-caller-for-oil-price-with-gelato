const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

/// Builder and ether.js
//const bre = require("@nomiclabs/buidler");
//const ethers = bre.ethers;
//const { utils } = require("ethers");

/// Gelato
const GelatoCoreLib = require("@gelatonetwork/core");
const GelatoUserProxyLib = require("@gelatonetwork/gelato-user-proxy");

/// My contract
const ActionHelloWorld = artifacts.require("ActionHelloWorld");


// GelatoGasPriceOracle setup vars
const GELATO_GAS_PRICE_START = ethers.utils.parseUnits("80", "gwei");

// The gas limit for our automated CHI.mint TX
// ActionChiMint caps chiAmount to 140 CHI => 6 mio gas should always suffice
const SELF_PROVIDER_GAS_LIMIT = 6000000; // 6 mio gas

// This is the gelatoGasPrice that we want to be the trigger for our
// automatic CHI minting => we set it to half of the initial gas price
const TRIGGER_GAS_PRICE = GELATO_GAS_PRICE_START.div("2");


contract("ActionHelloWorld", function(accounts) {
    /***
     * @notice - Global variable
     **/
    let actionHelloWorld;

    /***
     * @notice - Setup
     **/
    describe("Setup", () => {
        it('Setup ActionHelloWorld contract instance', async () => {
            // Get the contract instance.
            actionHelloWorld = await ActionHelloWorld.deployed();
        });

        console.log('=== actionHelloWorld ===', actionHelloWorld);
    });

    describe("Action via Gelato🍦", () => {
        it('Call HelloWorld.addNewGreetMessage via UserProxy (Delegatecall)', async () => {
            const newMessage = 'Hello!!'

            // Specify and Instantiate the Gelato Task
            taskAutoAddMessageWhenTriggerGasPrice = new GelatoCoreLib.Task({
              actions: [
                new GelatoCoreLib.Action({
                  addr: actionHelloWorld.address,
                  data: await actionHelloWorld.action(newMessage),
                  operation: GelatoCoreLib.Operation.Delegatecall,
                  termsOkCheck: false,
                }),
              ],
              selfProviderGasLimit: SELF_PROVIDER_GAS_LIMIT,
              // This makes sure we only mint CHI when the gelatoGasPrice is at or below
              // our desired trigger gas price
              selfProviderGasPriceCeil: TRIGGER_GAS_PRICE,
            });
        });

        it('Call HelloWorld.addNewGreetMessage via UserProxy (Delegatecall)', async () => {
            const newMessage = 'Hello!!'

            const res1 = await actionHelloWorld.action(newMessage);
            console.log('=== addNewGreetMessage ===', res1);
        });
    });    

});
