pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "./McObjects.sol";
import "./McEvents.sol";


// shared storage
contract McStorage is McObjects, McEvents {

    ///////////////////////////////////
    // @dev - This is only variable which value are assigned in "constructor"
    ///////////////////////////////////
    uint votingInterval;
    uint companyProfileDeadline;

    
    //////////////////////////////////
    // @dev - Define as mapping
    ///////////////////////////////////
    mapping (address => uint) depositedDai;

    mapping (uint => address) public companyProfileOwner;
    mapping (uint => string) public companyProfileDetails;
    mapping (uint => CompanyProfileState) public companyProfileState; // Company profile Id to current state

    mapping (uint => mapping(address => uint)) public usersNominatedProject; // Means user can only have one project.
    mapping (uint => mapping(uint => address[])) votedUserAddress;
    
    mapping (uint => mapping(uint => uint)) public companyProfileVotes;

    mapping (uint => mapping(uint => uint)) public companyProfileVoteCount;  // For counting vote of each companyProfileId
}
