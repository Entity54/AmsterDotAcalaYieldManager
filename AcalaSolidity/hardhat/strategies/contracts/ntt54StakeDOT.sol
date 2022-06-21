// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './LpStkDot.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@acala-network/contracts/schedule/ISchedule.sol";
import "@acala-network/contracts/utils/Address.sol";


contract ntt54StakeDOT is LpStkDot, ADDRESS {

    ISchedule schedule = ISchedule(ADDRESS.Schedule);
    
    ERC20 dot;
    ERC20 ausd;
    ERC20 aca;

    mapping(address => uint) public treasuryBalances;   //e.g. ACA has balance XYZ
    uint public REWARD_PER_BLOCK = 1 * 10 ** 12;
    uint constant public mantissa = 1e12;
    uint public epochNumber = 0;
    bool public distributionPermitted = true;
    
    address public admin;             

    address[] public userAccounts;                      
    mapping(address => bool) public registeredUserAccounts;  
    mapping(address => mapping(address => uint)) public userBalances; 

    modifier onlyAdmin {
        require(msg.sender==admin,"action only for admin");
        _;
    }

    modifier onlyAdmiOrStakerSC {
        require(msg.sender==address(this) || msg.sender==admin,"action only for this sc or admin");
        _;
    }


    constructor() {
        admin = msg.sender;
        dot = ERC20(ADDRESS.DOT);
        ausd = ERC20(ADDRESS.AUSD);
        aca = ERC20(ADDRESS.ACA);
    }

    //make sure you tranfer 2 ACA to SC for fees
    function transferFeesBalance(uint amount) public {
        aca.transferFrom(msg.sender,address(this),amount);
    }

    function setFixedRewardPerBlock(uint _rewardPerBlock) onlyAdmin external {
        REWARD_PER_BLOCK = _rewardPerBlock;
    }

    function depositToTreasury(uint amount) onlyAdmin external {
        ausd.transferFrom(msg.sender,address(this),amount);
        treasuryBalances[ADDRESS.AUSD] +=amount;
    }

    function withdrawFromTreasury(uint amount) onlyAdmin external {
        treasuryBalances[ADDRESS.AUSD] -=amount;
        ausd.transfer(msg.sender, amount);
    }

    function startDistributing() onlyAdmin external {
        distributeRewards();
        distributionPermitted = true;
    }
    function stopDistributing() onlyAdmin external {
        distributionPermitted = false;
    }

    function distributeRewards() onlyAdmiOrStakerSC public {
        if (distributionPermitted && ausd.balanceOf(address(this)) >= REWARD_PER_BLOCK )
        {

            if (userAccounts.length>0)
            {
                epochNumber +=1;

                for (uint i=0; i<userAccounts.length; i++)
                {
                    uint rewardAmount =  ( balanceOf(userAccounts[i]) * REWARD_PER_BLOCK ) / totalSupply() ;
                    ausd.transfer(userAccounts[i], rewardAmount);
                }

                treasuryBalances[ADDRESS.AUSD] -=REWARD_PER_BLOCK ;    

            }


            schedule.scheduleCall(
                address(this),
                0,
                1000000,
                5000,
                5,
                abi.encodeWithSignature("distributeRewards()")
            );

        }

    }

    //to be used for AUSD and ACA
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
    }

    function withdrawDOT(uint amount) public {
        require(amount <= userBalances[ADDRESS.DOT][msg.sender] ,"user does not have enough funds");
        userBalances[ADDRESS.DOT][msg.sender] -=amount;
        dot.transfer(msg.sender, amount);
        _burn(msg.sender, amount);

        if (userBalances[ADDRESS.DOT][msg.sender]==0)
        {
            registeredUserAccounts[msg.sender] = false;
            uint userAccountlengthM1 = userAccounts.length - 1;
            for (uint i=0; i<=userAccountlengthM1; i++)
            {
                if (userAccounts[i]==msg.sender)
                {
                    if (i<userAccountlengthM1)
                    {
                        userAccounts[i] = userAccounts[userAccountlengthM1];
                    }
                    userAccounts.pop();
                }
            }

        }

    }


}