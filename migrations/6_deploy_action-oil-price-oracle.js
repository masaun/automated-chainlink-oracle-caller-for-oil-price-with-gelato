const ActionOilPriceOracle = artifacts.require("ActionOilPriceOracle");
const OilPriceOracle = artifacts.require("OilPriceOracle");

const _oilPriceOracle = OilPriceOracle.address;

module.exports = function(deployer) {
    deployer.deploy(ActionOilPriceOracle, _oilPriceOracle);
};
