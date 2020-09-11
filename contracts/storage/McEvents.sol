pragma solidity ^0.5.16;

import "./McObjects.sol";


contract McEvents {

    event JoinPool(
        address indexed userWhoDeposited, 
        address depositedToken, 
        uint depositedAmount,
        uint totalDepositedDai
    );

    event CreateCompanyProfile(
        uint indexed newCompanyProfileId, 
        address companyProfileOwner,
        McObjects.CompanyProfileState companyProfileState,
        string companyProfileHash
    );

    event VoteForCompanyProfile(
        uint currentCompanyProfileVotingRound,  // For chekcing current voting round
        uint companyProfileVotes,      // For calculate deposited amount of each companyProfileId
        uint companyProfileVoteCount,  // For counting vote of each companyProfileId
        uint topCompanyProfileVoteCount,
        uint[] topCompanyProfileIds
    );

    event DistributeFunds(
        uint redeemedAmount, 
        uint principalBalance, 
        uint currentInterestIncome
    );

    event ReturnWinningAddressList(
        address[] winningAddressList
    );
    

    event WinningAddressTransferred(
        address winningAddress
    );

    event NoWinningAddressTransferred(
        string notificationMessage
    );

}
