// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './LpStg1.sol';
import './ntt54StakeDOT.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@acala-network/contracts/dex/IDEX.sol";
import "@acala-network/contracts/schedule/ISchedule.sol";
import "@acala-network/contracts/utils/Address.sol";
 

contract ntt54StgyAUSDincome is LpStg1, ADDRESS {

    uint constant public SC_BALANCE_FEES = 1 * 10 ** 12; //sc must always have this ACA balance to be able to run scheduler
    uint constant public SC_BALANCE_FEES_THRESHOLD = 2 * 10 ** 12; //if SC ACA balance falls below this level we will top it upto Target Level
    uint constant public SC_BALANCE_FEES_TARGET = 3 * 10 ** 12; //Target ACA balance for feees for sc

    IDEX dex = IDEX(ADDRESS.DEX);
    ISchedule schedule = ISchedule(ADDRESS.Schedule);

    ERC20 dot;
    ERC20 ausd;
    ERC20 aca;

    uint public frequency = 5;                 //how frequently will manage proceeds
    bool public managingProceedsState = true;  //allows admin to start/stop manageProceeds

    ntt54StakeDOT public LPTstake;
    address public stakingAddress;
    
    address public admin;             
    uint public epochNumber = 0;
    uint public totalDOTinAccount;
    uint public totalDOTtoUnstake;

    address[] public userAccounts;                    
    mapping(address => bool) public registeredUserAccounts; 
    mapping(address => mapping(address => uint)) public userBalances; 

    address[] public toStakeUserAccounts;  
    mapping(address => bool) public registeredToStakeUserAccounts; //checkes if an account has DOT for staking

    address[] public toUnStakeUserAccounts;  
    mapping(address => bool) public registeredToUnStakeUserAccounts; //checkes if an account has balance for unstaking
    mapping(address => uint) public userUnstakingBalances;

    address[] public accountsToRemove;  

    modifier onlyAdmin {
        require(msg.sender==admin,"action only for admin");
        _;
    }
    modifier onlyAdmiOrStgySC {
        require(msg.sender==address(this) || msg.sender==admin,"action only for this sc or admin");
        _;
    }

    uint public totalACAavailableBalance = 0; 
    uint public totalAUSDavailableBalance = 0; 
    uint public totalTargetAssetBalance = 0; 


    constructor(address _stakingAddress) {
        admin = msg.sender;
        dot  = ERC20(ADDRESS.DOT);
        ausd = ERC20(ADDRESS.AUSD);
        aca  = ERC20(ADDRESS.ACA);

        stakingAddress = _stakingAddress;
        LPTstake = ntt54StakeDOT(_stakingAddress);
        dot.approve(_stakingAddress, type(uint256).max);
    }

    function updateFrequency(uint _frequency)  external {
        frequency = _frequency;
    }

    //make sure you tranfer at least 2 ACA to SC for fees. If balance falls below 1 it will not continue
    function transferFeesBalance(uint amount) public {
        aca.transferFrom(msg.sender,address(this),amount);
    }

    function depositDOT(uint amount) public {
        //make sure approve smart contract as spender for this balance
        require(amount <= dot.allowance(msg.sender,address(this)),"client needs to increase allowance");

        if( !registeredUserAccounts[msg.sender] )
        {
            registeredUserAccounts[msg.sender] = true;
            userAccounts.push(msg.sender);
        }

        dot.transferFrom(msg.sender,address(this),amount);
        userBalances[ADDRESS.DOT][msg.sender] +=amount;
        _mint(msg.sender, amount);
        userBalances[address(this)][msg.sender] +=amount;

        totalDOTinAccount +=amount;

        //notifies that this account has DOT to be staked in the next round
        if( !registeredToStakeUserAccounts[msg.sender] )
        {
            registeredToStakeUserAccounts[msg.sender] = true;
            toStakeUserAccounts.push(msg.sender);
        }
    }

    function requestToUnstake(uint amount) external {
        uint availableToUnstake = userBalances[address(this)][msg.sender] - userUnstakingBalances[msg.sender];
        require(amount <= availableToUnstake ,"not enough strategy tokens to unstake");
        
        //notifies that this account has DOT to be staked in the next round
        if( !registeredToUnStakeUserAccounts[msg.sender] )
        {
            registeredToUnStakeUserAccounts[msg.sender] = true;
            toUnStakeUserAccounts.push(msg.sender);
        }
        userUnstakingBalances[msg.sender] +=amount;
        totalDOTtoUnstake +=amount;
    }
 
    function stakeFunds() public {      //onlyAdmin
        if(toStakeUserAccounts.length > 0 && totalDOTinAccount>0)
        {
            LPTstake.depositDOT(totalDOTinAccount);
            //now sc has LPTstake Tokens which it needs to distribute

            for (uint i=0; i<toStakeUserAccounts.length; i++)
            {
                userBalances[stakingAddress][toStakeUserAccounts[i]] += userBalances[ADDRESS.DOT][toStakeUserAccounts[i]];
                userBalances[ADDRESS.DOT][toStakeUserAccounts[i]] = 0;
            }
            toStakeUserAccounts = new address[](0);
            totalDOTinAccount = 0;
        }
    }


    function unstakeFunds() public {     //onlyAdmin
        if(toUnStakeUserAccounts.length > 0 && totalDOTtoUnstake>0)
        {
            LPTstake.withdrawDOT(totalDOTtoUnstake);
            //this sc received totalDOTtoUnstake DOT,  equal amount of LPT tokens are burned
            //update user accounts with LPTtokens, burn STG1 tokens, transfer DOT out

            for (uint i=0; i<toUnStakeUserAccounts.length; i++)
            {
                address userAccount = toUnStakeUserAccounts[i];
                uint userAccountToReceiveDOT = userUnstakingBalances[userAccount];

                //update LpStDOT account balance
                userBalances[stakingAddress][userAccount] -=userAccountToReceiveDOT;

                //burn STG1 tokens
                _burn(userAccount, userAccountToReceiveDOT);
                userBalances[address(this)][userAccount] -=userAccountToReceiveDOT;
                if(userBalances[address(this)][userAccount] == 0) //prepare to remove account
                {
                    accountsToRemove.push(userAccount);
                }

                //transfer DOT
                dot.transfer(userAccount, userAccountToReceiveDOT);

                //Reset conditions for accoutn to usntake
                registeredToUnStakeUserAccounts[userAccount] = false;
                userUnstakingBalances[userAccount] = 0;
            }

            toUnStakeUserAccounts = new address[](0);
            totalDOTtoUnstake = 0;
            unregisterAccounts();
        }

    }


    function unregisterAccounts() private {
        require(accountsToRemove.length>0,"no accounts to remove");
        for (uint j=0; j<accountsToRemove.length; j++)
        {
            uint userAccountlengthM1 = userAccounts.length - 1;
            for (uint i=0; i<=userAccountlengthM1; i++)
            {
                if (accountsToRemove[j] == userAccounts[i])
                {
                    if (i<userAccountlengthM1)
                    {
                        userAccounts[i] = userAccounts[userAccountlengthM1];
                    }
                    userAccounts.pop();
                    registeredUserAccounts[accountsToRemove[j]] = false;
                }
            }
        }
    }

    function startManagingProcees() onlyAdmin external {
        manageProceeds();
        managingProceedsState = true;
    }

    function stopManagingProcees() onlyAdmin external {
        managingProceedsState = false;
    }


    function manageProceeds() onlyAdmiOrStgySC public {

        if (managingProceedsState)
        {
                totalAUSDavailableBalance = ausd.balanceOf(address(this));
                totalACAavailableBalance = aca.balanceOf(address(this));

                uint numTokensdistributed = 0;

                if (userAccounts.length>0 && totalAUSDavailableBalance>0 && totalACAavailableBalance > SC_BALANCE_FEES)
                {
                    // totalACAavailableBalance -=SC_BALANCE_FEES;  //ensure sc always has balance of 2 ACA roughly to be able to pay scheduler tx triggers
                    
                    //swap ACA for TargetAsset
                    address[] memory path = new address[](2);
                    path[0] = ADDRESS.AUSD;
                    path[1] = ADDRESS.ACA;
                    uint targetReceivedAmount = dex.getSwapTargetAmount(path, totalAUSDavailableBalance);
                    require(dex.swapWithExactSupply(path, totalAUSDavailableBalance, 1), "Swapping AUSD yield for ACA failed");
                    
                    if (totalACAavailableBalance < SC_BALANCE_FEES_THRESHOLD)
                    {
                        uint toppingAmount = SC_BALANCE_FEES_TARGET - totalACAavailableBalance;
                        //keep some ACA back for SC fees or all of it if the targetReceivedAmount is lower than toppingAmount, so no distribution in this round
                        totalTargetAssetBalance = targetReceivedAmount > toppingAmount ? targetReceivedAmount - toppingAmount : 0; 
                    }
                    else
                    {
                        totalTargetAssetBalance = targetReceivedAmount;
                    }

                    epochNumber +=1;

                    if (totalTargetAssetBalance>0)
                    {
                        for (uint i=0; i<userAccounts.length; i++)
                        {
                            uint rewardAmount;
                            if (i<userAccounts.length-1)
                            {
                                rewardAmount =  ( balanceOf(userAccounts[i]) * totalTargetAssetBalance ) / totalSupply() ;
                                numTokensdistributed +=rewardAmount;
                            }
                            else
                            {
                                rewardAmount = totalTargetAssetBalance - numTokensdistributed;
                            }

                            //transfer to users wallet
                            aca.transfer(userAccounts[i], rewardAmount);
                        }
                    }

                }
                
                //stake any DOT funds that are sitting in the sc waiting to be staked 
                stakeFunds();

                //unstake any DOT for account that have places a requestToUnstake
                unstakeFunds();

                schedule.scheduleCall(
                    address(this),
                    0,
                    1000000,
                    5000,
                    frequency,
                    abi.encodeWithSignature("manageProceeds()")
                );

        }

    }


}