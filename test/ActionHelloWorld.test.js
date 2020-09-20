const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

/// My contract
const ActionHelloWorld = artifacts.require("ActionHelloWorld");

/// Gelato
const ethers = require("ethers");  /// [Notice]: ethers.js version must be more thant v5.0.0
const GelatoCoreLib = require("@gelatonetwork/core");
const ProviderModuleGelatoUserProxy = require("@gelatonetwork/gelato-user-proxy");

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


    /* Website: https://gelato.network/  */
    describe("Action via Gelato🍦 from Website", () => {
        it('Call HelloWorld.addNewGreetMessage via UserProxy (Delegatecall)', async () => {
            const newMessage = 'Hello!!'

            /// [In progress]: https://gelato.network/

            /// Define a Condition => When the transaction should execute
            const condition = new GelatoCoreLib.Condition({
                inst: actionHelloWorld.address,             // condition address
                data: await actionHelloWorld.action(newMessage),  // e.g. every 5 minutes
            });

            /// Define an action => What that transaction should do
            const action = new GelatoCoreLib.Action({
                addr: actionHelloWorld.address,                   // action address
                data: await actionHelloWorld.action(newMessage),  // data defining trade
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

            // Define who will pay for the transaction,
            // Gelato User Proxy
            const gelatoUserProxyAddress = accounts[0] // "YOUR_PROXY_ADDRESS"
            const providerModuleGelatoUserProxy = ProviderModuleGelatoUserProxy.address /// Contract address of ProviderModuleGelatoUserProxy.sol

            /// the user directly or the developer
            const gelatoProvider = new GelatoCoreLib.GelatoProvider({
                addr: gelatoUserProxyAddress,
                module: providerModuleGelatoUserProxy,
            });

            /// Submit transaction to gelato and it will
            /// be executed when the condition is fulfilled
            await gelatoCore.submitTask(gelatoProvider, task, 0)

        });
    }); 

});
