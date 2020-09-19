const ethers = require("ethers");
const GelatoCoreLib = require("@gelatonetwork/core");

/// My contract
const ConditionTime = artifacts.require("ConditionTime");

const conditionAddress = ConditionTime.address;
//const conditionAddress = "0x63129681c487d231aa9148e1e21837165f38deaf"
const conditionAbi = ["function timeCheck(uint256 _timestamp) view returns(string memory)"]
const iFace = new ethers.utils.Interface(conditionAbi)
const futureTimestamp = 1599800000

// #### Create the condition object

const condition = new GelatoCoreLib.Condition({
    inst: conditionAddress,
    data: iFace.encodeFunctionData("timeCheck", [
        futureTimestamp
    ]),
})
