const ethers = require("ethers");
const GelatoCoreLib = require("@gelatonetwork/core");

/// My contract
const ConditionTime = artifacts.require("ConditionTime");

const conditionAddress = ConditionTime.address;
//const conditionAddress = "0x63129681c487d231aa9148e1e21837165f38deaf"
const conditionAbi = ConditionTime.abi;
//const conditionAbi = ["function timeCheck(uint256 _timestamp) view returns(string memory)"]
const iFace = new ethers.utils.Interface(conditionAbi)
const futureTimestamp = 1599800000


/// Log
console.log('=== conditionAddress ===', conditionAddress);
console.log('=== conditionAbi ===', conditionAbi);
console.log('=== iFace ===', iFace);



// #### Create the condition object

const condition = new GelatoCoreLib.Condition({
    inst: conditionAddress,
    data: iFace.encodeFunctionData("timeCheck", [
        futureTimestamp
    ]),
})
