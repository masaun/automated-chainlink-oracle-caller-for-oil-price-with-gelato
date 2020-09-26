const ActionHelloWorld = artifacts.require("ActionHelloWorld");
const HelloWorld = artifacts.require("HelloWorld");

const _helloWorld = HelloWorld.address;

module.exports = function(deployer) {
    deployer.deploy(ActionHelloWorld, _helloWorld);
};
