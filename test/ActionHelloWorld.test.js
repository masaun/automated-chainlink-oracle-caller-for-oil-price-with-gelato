const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

const ActionHelloWorld = artifacts.require("ActionHelloWorld");

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

            const res1 = await actionHelloWorld.action(newMessage);
            console.log('=== addNewGreetMessage ===', res1);
        });
    });    

});
