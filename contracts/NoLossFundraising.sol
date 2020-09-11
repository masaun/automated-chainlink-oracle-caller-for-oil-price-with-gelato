pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// Use original Ownable.sol
import "./lib/OwnableOriginal.sol";

// Storage
import "./storage/McStorage.sol";
import "./storage/McConstants.sol";

// AAVE
import "./aave/contracts/interfaces/ILendingPool.sol";
import "./aave/contracts/interfaces/ILendingPoolCore.sol";
import "./aave/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "./aave/contracts/interfaces/IAToken.sol";


/***
 * @notice - This contract is that ...
 **/
contract NoLossFundraising is OwnableOriginal(msg.sender), McStorage, McConstants {
    using SafeMath for uint;

    uint companyProfileId;
    uint newCompanyProfileId;
    uint companyProfileVotingRound;
    uint totalDepositedDai;
    mapping (uint => uint[]) topCompanyProfileIds;      /// Key is "companyProfileRound"
    mapping (uint => uint) topCompanyProfileVoteCount;  /// Key is "companyProfileRound"
    //uint topCompanyProfileVoteCount;

    mapping (uint => uint) topCompanyProfileIdsCounter; /// Key is "companyProfileRound"


    IERC20 public dai;
    ILendingPool public lendingPool;
    ILendingPoolCore public lendingPoolCore;
    ILendingPoolAddressesProvider public lendingPoolAddressesProvider;
    IAToken public aDai;

    constructor(address daiAddress, address _lendingPool, address _lendingPoolCore, address _lendingPoolAddressesProvider, address _aDai) public {
        dai = IERC20(daiAddress);
        lendingPool = ILendingPool(_lendingPool);
        lendingPoolCore = ILendingPoolCore(_lendingPoolCore);
        lendingPoolAddressesProvider = ILendingPoolAddressesProvider(_lendingPoolAddressesProvider);
        aDai = IAToken(_aDai);

        /// every 1 weeks, voting deadline is updated
        votingInterval = 10;         /// For testing (Every 10 second, voting deadline is updated)
        //votingInterval = 1 weeks;  /// For actual 
        companyProfileDeadline = now.add(votingInterval);        
    }



    /***
     * @notice - Join Pool (Deposit DAI into idle-contracts-v3) for getting right of voting
     **/
    function joinPool(address _reserve, uint256 _amount, uint16 _referralCode) public returns (bool) {
        /// Transfer from wallet address
        dai.transferFrom(msg.sender, address(this), _amount);

        /// Approve LendingPool contract to move your DAI
        dai.approve(lendingPoolAddressesProvider.getLendingPoolCore(), _amount);

        /// Deposit DAI
        lendingPool.deposit(_reserve, _amount, _referralCode);

        /// Save deposited amount each user
        depositedDai[msg.sender] = _amount;
        totalDepositedDai.add(_amount);
        emit JoinPool(msg.sender, _reserve, _amount, totalDepositedDai);
    }

    /***
     * @notice - Create a profile of company which request investment and list them.
     * @return - New company profile id
     **/
    function createCompanyProfile(string memory companyProfileHash) public returns (uint newCompanyProfileId) {
        // The first company profile will have an ID of 1
        newCompanyProfileId = companyProfileId++;
        //newCompanyProfileId = companyProfileId.add(1);

        companyProfileOwner[newCompanyProfileId] = msg.sender;
        companyProfileState[newCompanyProfileId] = CompanyProfileState.Active;
        companyProfileDetails[newCompanyProfileId] = companyProfileHash;

        emit CreateCompanyProfile(newCompanyProfileId, 
                                  companyProfileOwner[newCompanyProfileId], 
                                  companyProfileState[newCompanyProfileId], 
                                  companyProfileDetails[newCompanyProfileId]);
    }

    /***
     * @notice - Vote for a favorite CompanyProfile of voter (voter is only user who deposited before)
     **/
    function voteForCompanyProfile(uint256 companyProfileIdToVoteFor) public {
        // Can only vote if they joined a previous iteration round...
        // Check if the msg.sender has given approval rights to our steward to vote on their behalf
        uint currentCompanyProfile = usersNominatedProject[companyProfileVotingRound][msg.sender];
        if (currentCompanyProfile != 0) {
            companyProfileVotes[companyProfileVotingRound][currentCompanyProfile] = companyProfileVotes[companyProfileVotingRound][currentCompanyProfile].sub(depositedDai[msg.sender]);
        }

        /// "companyProfileVotingRound" is what number of voting round are.
        /// Save what voting round is / who user voted for / how much user deposited
        companyProfileVotes[companyProfileVotingRound][companyProfileIdToVoteFor] = companyProfileVotes[companyProfileVotingRound][companyProfileIdToVoteFor].add(depositedDai[msg.sender]);

        /// Save who user voted for  
        usersNominatedProject[companyProfileVotingRound][msg.sender] = companyProfileIdToVoteFor;

        /// Save voted user address
        votedUserAddress[companyProfileVotingRound][companyProfileIdToVoteFor].push(msg.sender);

        /// Update voting count of voted companyProfileId
        companyProfileVoteCount[companyProfileVotingRound][companyProfileIdToVoteFor] = companyProfileVoteCount[companyProfileVotingRound][companyProfileIdToVoteFor].add(1);

        /// Update current top project (companyProfile)
        uint _topCompanyProfileVoteCount;
        uint[] memory _topCompanyProfileIds;
        (_topCompanyProfileVoteCount, _topCompanyProfileIds) = getTopCompanyProfile(companyProfileVotingRound);

        emit VoteForCompanyProfile(companyProfileVotingRound,
                                   companyProfileVotes[companyProfileVotingRound][companyProfileIdToVoteFor],
                                   companyProfileVoteCount[companyProfileVotingRound][companyProfileIdToVoteFor],
                                   _topCompanyProfileVoteCount,
                                   _topCompanyProfileIds);
    }

    function getTopCompanyProfile(uint companyProfileVotingRound) public returns (uint _topCompanyProfileVoteCount, uint[] memory topCompanyProfileIds) {
        /// Update current top project (artwork)
        uint currentCompanyProfileId = companyProfileId;
        for (uint i=0; i < currentCompanyProfileId; i++) {
            if (companyProfileVoteCount[companyProfileVotingRound][i] >= topCompanyProfileVoteCount[companyProfileVotingRound]) {
                topCompanyProfileVoteCount[companyProfileVotingRound] = companyProfileVoteCount[companyProfileVotingRound][i];
            } 
        }

        uint[] memory topCompanyProfileIds;
        getTopCompanyProfileIds(companyProfileVotingRound, topCompanyProfileVoteCount[companyProfileVotingRound]);
        topCompanyProfileIds = returnTopCompanyProfileIds(companyProfileVotingRound); 

        return (topCompanyProfileVoteCount[companyProfileVotingRound], topCompanyProfileIds); 
    }

    /// Need to execute for-loop in frontend to get TopCompanyProfileIds
    function getTopCompanyProfileIds(uint _companyProfileVotingRound, uint _topCompanyProfileVoteCount) public {
        uint currentCompanyProfileId = companyProfileId;
        for (uint i=0; i < currentCompanyProfileId; i++) {
            if (companyProfileVoteCount[_companyProfileVotingRound][i] == _topCompanyProfileVoteCount) {
                /// Check whether there are duplicated elements or not
                uint length = topCompanyProfileIds[_companyProfileVotingRound].length;
                bool judgeDuplication;
                for (uint p=0; p < length; p++) {
                    if (topCompanyProfileIds[_companyProfileVotingRound][p] == i) {
                        judgeDuplication = true;
                    }
                }

                /// Push
                if (judgeDuplication == false) {
                    topCompanyProfileIds[_companyProfileVotingRound].push(i);
                } 
            } 
        } 
    }

    function returnTopCompanyProfileIds(uint _companyProfileVotingRound) public view returns(uint[] memory _topCompanyProfileIdsMemory) {
        uint topCompanyProfileIdsLength = topCompanyProfileIds[_companyProfileVotingRound].length;

        uint[] memory topCompanyProfileIdsMemory = new uint[](topCompanyProfileIdsLength);
        topCompanyProfileIdsMemory = topCompanyProfileIds[_companyProfileVotingRound];
        return topCompanyProfileIdsMemory;
    }


    /***
     * @notice - Distribute fund into selected CompanyProfile by voting)
     **/
    function distributeFunds(address _reserve, uint16 _referralCode) public {
        // On a *whatever we decide basis* the funds are distributed to the winning project
        // E.g. every 2 weeks, the project with the most votes gets the generated interest.

        require(companyProfileDeadline < now, "current vote still active");

        /// Redeem
        address _user = address(this);
        uint redeemAmount = aDai.balanceOf(_user);
        uint principalBalance = aDai.principalBalanceOf(_user);
        aDai.redeem(redeemAmount);

        /// Calculate current interest income
        uint redeemedAmount = dai.balanceOf(_user);
        uint currentInterestIncome = redeemedAmount - principalBalance;

        /// Count voting every CompanyProfile
        uint _topCompanyProfileVoteCount;
        uint[] memory topCompanyProfileIds;
        (_topCompanyProfileVoteCount, topCompanyProfileIds) = getTopCompanyProfile(companyProfileVotingRound);

        /// Select winning address
        /// Transfer redeemed Interest income into winning address
        address[] memory winningAddressList;
        for (uint i=0; i < topCompanyProfileIds.length; i++) {
            winningAddressList = returnWinningAddressList(companyProfileVotingRound, topCompanyProfileIds[i]);
        }
        emit ReturnWinningAddressList(winningAddressList);
        //uint numberOfWinningAddress = 1;
        uint numberOfWinningAddress = winningAddressList.length;
        uint dividedInterestIncome = currentInterestIncome.div(numberOfWinningAddress);
        for (uint w=0; w < winningAddressList.length; w++) {
            address winningAddress = winningAddressList[w];
            dai.approve(winningAddress, dividedInterestIncome);
            dai.transfer(winningAddress, dividedInterestIncome);
            emit WinningAddressTransferred(winningAddress);
        }
  

        /// Re-lending principal balance into AAVE
        dai.approve(lendingPoolAddressesProvider.getLendingPoolCore(), principalBalance);
        lendingPool.deposit(_reserve, principalBalance, _referralCode);

        /// Set next voting deadline
        companyProfileDeadline = companyProfileDeadline.add(votingInterval);

        /// "companyProfileVotingRound" is number of voting round
        /// Set next voting round
        /// Initialize the top project of next voting round
        companyProfileVotingRound = companyProfileVotingRound.add(1);
        topCompanyProfileVoteCount[companyProfileVotingRound] = 0;

        emit DistributeFunds(redeemedAmount, principalBalance, currentInterestIncome);
    }

    function returnWinningAddressList(uint _companyProfileVotingRound, uint _votedCompanyProfileId) public view returns(address[] memory _winningAddressListMemory) {
        uint winningAddressListLength = votedUserAddress[_companyProfileVotingRound][_votedCompanyProfileId].length;
        address[] memory winningAddressListMemory = new address[](winningAddressListLength);
        winningAddressListMemory = votedUserAddress[_companyProfileVotingRound][_votedCompanyProfileId];
        return winningAddressListMemory;
    }


    /***
     * @notice - Getter Function
     **/
    function getCurrentCompanyProfileId() public view returns (uint currentCompanyProfileId) {
        return companyProfileId;
    }

    function getCompanyProfile(uint companyProfileId) 
        public 
        view 
        returns (uint _companyProfileId, 
                 address _companyProfileOwner,
                 CompanyProfileState _companyProfileState,
                 string memory _companyProfileHash) 
    {
        return (companyProfileId,
                companyProfileOwner[companyProfileId],
                companyProfileState[companyProfileId],
                companyProfileDetails[companyProfileId]);
    }

    function balanceOfContract() public view returns (uint balanceOfContract_DAI, uint balanceOfContract_ETH) {
        return (dai.balanceOf(address(this)), address(this).balance);
    }


    /***
     * @notice - Test Functions
     **/    
    function getAaveRelatedFunction() public view returns (uint redeemAmount, uint principalBalance) {
        /// Redeem
        address _user = address(this);
        uint redeemAmount = aDai.balanceOf(_user);
        uint principalBalance = aDai.principalBalanceOf(_user);
 
        return (redeemAmount, principalBalance);
    }
    

}
