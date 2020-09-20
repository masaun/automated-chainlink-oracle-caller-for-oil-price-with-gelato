const OilPriceOracle  = artifacts.require("OilPriceOracle");

module.exports = function(deployer) {
    deployer.deploy(OilPriceOracle);
};
