/// Using local network
const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/34ed41c4cf28406885f032930d670036");
//const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

/// My contract
const ActionOilPriceOracle = artifacts.require("ActionOilPriceOracle");
const OilPriceOracle = artifacts.require("OilPriceOracle");

/// Gelato
const ethers = require("ethers");  /// [Notice]: ethers.js version must be more thant v5.0.0
const GelatoCoreLib = require("@gelatonetwork/core");
const ProviderModuleGelatoUserProxy = require("@gelatonetwork/gelato-user-proxy");
const GelatoUserProxy = require("@gelatonetwork/gelato-user-proxy/artifacts/GelatoUserProxy.json");


contract("ActionOilPriceOracle", function(accounts) {
    /***
     * @notice - Global variable
     **/
    let actionOilPriceOracle;

    /***
     * @notice - Setup
     **/
    describe("Setup", () => {
        it('Setup ActionOilPriceOracle contract instance', async () => {
            // Get the contract instance.
            actionOilPriceOracle = await ActionOilPriceOracle.deployed();
        });

        console.log('=== actionOilPriceOracle ===', actionOilPriceOracle);
    });


    /* Website: https://gelato.network/  */
    describe("Action via Gelato🍦 from Website", () => {
        it('Call OilPriceOracle.addNewGreetMessage via UserProxy (Using .Call)', async () => {

            /// [In progress]: https://gelato.network/

            /// Define a Condition => When the transaction should execute
            const condition = new GelatoCoreLib.Condition({
                inst: actionOilPriceOracle.address,             // condition address
                data: await actionOilPriceOracle.action(),  // e.g. every 5 minutes
            });

            /// Define an action => What that transaction should do
            const action = new GelatoCoreLib.Action({
                addr: actionOilPriceOracle.address,                   // action address
                data: await actionOilPriceOracle.action(),  // data defining trade
                operation: GelatoCoreLib.Operation.Call           // [Note]: For EOA wallet
                //operation: GelatoCoreLib.Operation.Delegatecall // [Note]: For smart contract wallet
            });

            /// Combine condition + action to a task
            const task = new GelatoCoreLib.Task({
                conditions: [condition],
                actions: [action],
                selfProviderGasLimit: 0,
                selfProviderGasPriceCeil: 0
            });

            // Assign contract address of GelatoUserProxy.sol and ProviderModuleGelatoUserProxy.sol
            // Define who will pay for the transaction,
            // Gelato User Proxy
            const gelatoUserProxyAddress = GelatoUserProxy.address
            const providerModuleGelatoUserProxy = ProviderModuleGelatoUserProxy.address





            /************************************************************************************
             * Error "Provider: no string addr passed to constructor " has been happening below.
             ************************************************************************************/

            /// the user directly or the developer <-- This code is row which error has been happening
            // Gelato provider object
            const gelatoProvider = new GelatoCoreLib.GelatoProvider({
                addr: gelatoUserProxyAddress,
                module: providerModuleGelatoUserProxy
            })

            const gelatoUserProxy = await ethers.getContractAt(
                                        GelatoCoreLib.GelatoUserProxy.abi,
                                        gelatoUserProxyAddress
                                    );

            /// Submit transaction to gelato and it will
            /// be executed when the condition is fulfilled
            await gelatoUserProxy.submitTask(gelatoProvider, task, 0)  // [Note]: Submit one-time task
        });
    }); 

});
