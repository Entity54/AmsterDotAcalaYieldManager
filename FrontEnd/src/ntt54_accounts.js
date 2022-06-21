import { ACA, AUSD, DEX, Schedule, Oracle, EVM, DOT, LP_ACA_AUSD, LP_DOT_AUSD, LP_LDOT_AUSD, LP_RENBTC_AUSD, LDOT, RENBTC }  from '@acala-network/contracts/utils/Address';
import { Contract } from 'ethers';
import { ethers } from 'ethers';  
import { formatUnits, parseUnits } from 'ethers/lib/utils';

import TokenContract from '@acala-network/contracts/build/contracts/Token.json';

// const DEXContract = require("@acala-network/contracts/build/contracts/DEX.json");
// const TokenContract = require("@acala-network/contracts/build/contracts/Token.json")
// const { formatUnits, parseUnits } = require("ethers/lib/utils");


let wallet, provider,
    ntt54_StakeDOT, ntt54StgyAUSDincome, ntt54StgyDOTincome, ntt54StgyACAincome,
    ntt54StakeDOT_address, ntt54StgyAUSDincome_address, ntt54StgyDOTincome_address, ntt54StgyACAincome_address,
    STR1instance, STR2instance, STR3instance
    ;
let ACAinstance, AUSDinstance, DOTinstance, LDOTinstance, RENBTCinstance;
let tokenInstances = { 
      ACA   : ACAinstance, 
      AUSD  : AUSDinstance, 
      DOT   : DOTinstance,
      LDOT  : LDOTinstance, 
      RENBTC: RENBTCinstance 
};
const tokensArray = [ "ACA", "AUSD", "DOT", "LDOT", "RENBTC"];
const tokens= { ACA, AUSD, DOT, LDOT, RENBTC };



const setInstances = async (
        _wallet, _provider, 
        _ntt54_StakeDOT, _ntt54StgyAUSDincome, _ntt54StgyDOTincome=null, _ntt54StgyACAincome=null,
        _ntt54StakeDOT_address, _ntt54StgyAUSDincome_address, _ntt54StgyDOTincome_address=null, _ntt54StgyACAincome_address=null
) => {
  wallet    = _wallet; 
  provider  = _provider;
  ntt54_StakeDOT = _ntt54_StakeDOT;
  ntt54StgyAUSDincome = _ntt54StgyAUSDincome;
  ntt54StgyDOTincome = _ntt54StgyDOTincome;
  ntt54StgyACAincome = _ntt54StgyACAincome;
  ntt54StakeDOT_address = _ntt54StakeDOT_address;
  ntt54StgyAUSDincome_address = _ntt54StgyAUSDincome_address;
  ntt54StgyDOTincome_address = _ntt54StgyDOTincome_address;
  ntt54StgyACAincome_address = _ntt54StgyACAincome_address;

  console.log(`Setting instances for new wallet with address ${await wallet.getAddress()} `)
  // DEXinstance     = new Contract(DEX    , DEXContract.abi  , wallet);

  ACAinstance     = new Contract(ACA    , TokenContract.abi, wallet);
  AUSDinstance    = new Contract(AUSD   , TokenContract.abi, wallet);
  DOTinstance     = new Contract(DOT    , TokenContract.abi, wallet);
  LDOTinstance    = new Contract(LDOT   , TokenContract.abi, wallet);
  RENBTCinstance  = new Contract(RENBTC , TokenContract.abi, wallet);

  tokenInstances = { 
                    ACA   : ACAinstance, 
                    AUSD  : AUSDinstance, 
                    DOT   : DOTinstance,
                    LDOT  : LDOTinstance, 
                    RENBTC: RENBTCinstance 
                   };

  getBasicInfo();
}

const getBasicInfo = async () => {
  if (ntt54_StakeDOT && DOTinstance && ntt54StakeDOT_address)
  {
    const ntt54_StakeDOT_admin = await ntt54_StakeDOT.admin();
    const treasuryBalances = formatUnits((await (ntt54_StakeDOT.treasuryBalances(AUSD))).toString()   , 12);   
    const dot_StakedBalance = formatUnits((await (DOTinstance.balanceOf(ntt54StakeDOT_address))).toString()   , 10);   
    const REWARD_PER_BLOCK = formatUnits((await ntt54_StakeDOT.REWARD_PER_BLOCK()).toString() , 12);
    const epochNumber = (await ntt54_StakeDOT.epochNumber()).toString();
    const contractState = true;// await ntt54_StakeDOT.distributionPermitted();
    const stake_ContractACAbalance = await getAccount_ACA_Balance(ntt54StakeDOT_address);
    console.log(` ****** ntt54_StakeDOT ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber} stake_ContractACAbalance:${stake_ContractACAbalance} ****** `);
    return {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance, contractState, stake_ContractACAbalance};
  } else return null;
}



const depositToTreasuryStakingContract = async (amount) => {
  const amountWEI = parseUnits(amount,12);
  console.log(`Running depositToTreasuryStakingContract for amountWEI:${amountWEI} amount:${amount}`);

  return new Promise( async (resolve,reject) => {
    const tx = await AUSDinstance.approve(ntt54StakeDOT_address, amountWEI);
    const account = await wallet.getAddress();
    tx.wait().then( async (message) => {
       console.log(`approveERC20forSC from account:${account} has been completed message: `,message);

         const tx2 = await ntt54_StakeDOT.depositToTreasury(amountWEI);
         tx2.wait().then( message2 => {
           console.log(`depositToTreasuryStakingContract message: `,message2);
           resolve(message2);
         })
         .catch( error => reject(error));
       
    })
    .catch( error => reject(error));

  })

}

const updateTreasuryRewardPerEpoch = async (amount) => {
  const amountWEI = parseUnits(amount,12);
  console.log(`Running updateTreasuryRewardPerEpoch for amountWEI:${amountWEI} amount:${amount}`);

  return new Promise( async (resolve,reject) => {

    const tx = await ntt54_StakeDOT.setFixedRewardPerBlock(amountWEI);
    tx.wait().then( message => {
      console.log(`updateTreasuryRewardPerEpoch message: `,message);
      resolve(message);
    })
    .catch( error => reject(error));

  })
  
};

const withdrawFromTreasury = async (amount) => {
  const amountWEI = parseUnits(amount,12);
  console.log(`Running updateTreasuryRewardPerEpoch for amountWEI:${amountWEI} amount:${amount}`);

  return new Promise( async (resolve,reject) => {

    const tx = await ntt54_StakeDOT.withdrawFromTreasury(amountWEI);
    tx.wait().then( message => {
      console.log(`withdrawFromTreasury message: `,message);
      resolve(message);
    })
    .catch( error => reject(error));

  })
  
};



const deposit_FeesToStrategyAUSD = async (amount) => {
  const amountWEI = parseUnits(amount,12);
  console.log(`Running deposit_FeesToStrategyAUSD for amountWEI:${amountWEI} amount:${amount}`);

  return new Promise( async (resolve,reject) => {
    const tx = await ACAinstance.approve(ntt54StgyAUSDincome_address, amountWEI);
  
    tx.wait().then( async (message) => {
       console.log(`approveERC20forSC  has been completed message: `,message);

         const tx2 = await ntt54StgyAUSDincome.transferFeesBalance(amountWEI);
         tx2.wait().then( message2 => {
           console.log(`deposit_FeesToStrategyAUSD message: `,message2);
           resolve(message2);
         })
         .catch( error => reject(error));
       
    })
    .catch( error => reject(error));

  })

}

const deposit_FeesToStakingContract = async (amount) => {
  if(ntt54StakeDOT_address && ntt54_StakeDOT)
  {
      const amountWEI = parseUnits(amount,12);
      console.log(`Running deposit_FeesToStakingContract for amountWEI:${amountWEI} amount:${amount}`);
    
      return new Promise( async (resolve,reject) => {
        const tx = await ACAinstance.approve(ntt54StakeDOT_address, amountWEI);
      
        tx.wait().then( async (message) => {
          console.log(`approveERC20forSC  has been completed message: `,message);
    
            const tx2 = await ntt54_StakeDOT.transferFeesBalance(amountWEI);
            tx2.wait().then( message2 => {
              console.log(`deposit_FeesToStakingContract message: `,message2);
              resolve(message2);
            })
            .catch( error => reject(error));
          
        })
        .catch( error => reject(error));
    
      })

  }

}



const getAccount_ACA_Balance = async (accountAddress) => {
  if (accountAddress && ACAinstance)
  {
    console.log("Getting account ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(accountAddress);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}
const getAccount_AUSD_Balance = async (accountAddress) => {
  if (accountAddress && AUSDinstance)
  {
    console.log("Getting account AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(accountAddress);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}
const getAccount_DOT_Balance = async (accountAddress) => {
  if (accountAddress && DOTinstance)
  {
    console.log("Getting account DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(accountAddress);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}

//ntt54StgyAUSDincome
const getAccount_STR1_Balance = async (accountAddress) => {
  if (accountAddress && ntt54StgyAUSDincome)
  {
    console.log("Getting account STR1 / ntt54StgyAUSDincome Balance Please wait");
    const STR1_BalanceWEI = await ntt54StgyAUSDincome.balanceOf(accountAddress);
    const STR1_Balance    = formatUnits(STR1_BalanceWEI.toString()   , 10);
    return Number(STR1_Balance).toFixed(3);
  }
  else return null;
}

//ntt54StgyDOTincome
const getAccount_STR2_Balance = async (accountAddress) => {
  // if (accountAddress && ntt54StgyDOTincome)
  // {
  //   console.log("Getting account STR2  / ntt54StgyDOTincome Balance Please wait");
  //   const STR2_BalanceWEI = await ntt54StgyDOTincome.balanceOf(accountAddress);
  //   const STR2_Balance    = formatUnits(STR2_BalanceWEI.toString()   , 10);
  //   return Number(STR2_Balance).toFixed(3);
  // }
  // else return null;
  return null;
}

//ntt54StgyACAincome
const getAccount_STR3_Balance = async (accountAddress) => {
  // if (accountAddress && ntt54StgyACAincome)
  // {
  //   console.log("Getting account STR3 / ntt54StgyACAincome Balance Please wait");
  //   const STR3_BalanceWEI = await ntt54StgyACAincome.balanceOf(accountAddress);
  //   const STR3_Balance    = formatUnits(STR3_BalanceWEI.toString()   , 10);
  //   return Number(STR3_Balance).toFixed(3);
  // }
  // else return null;
  return null;
}






const getStrategyAUSD_AUSD_Balance = async () => {
  if (ntt54StgyAUSDincome_address && AUSDinstance)
  {
    console.log("Getting ntt54StgyAUSDincome AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(ntt54StgyAUSDincome_address);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyDOT_AUSD_Balance = async () => {
  if (ntt54StgyDOTincome_address && AUSDinstance)
  {
    console.log("Getting ntt54StgyDOTincome AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(ntt54StgyDOTincome_address);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyACA_AUSD_Balance = async () => {
  if (ntt54StgyACAincome_address && AUSDinstance)
  {
    console.log("Getting ntt54StgyACAincome AUSD Balance Please wait");
    const AUSD_BalanceWEI = await AUSDinstance.balanceOf(ntt54StgyACAincome_address);
    const AUSD_Balance    = formatUnits(AUSD_BalanceWEI.toString()   , 12);
    return Number(AUSD_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyAUSD_ACA_Balance = async () => {
  if (ntt54StgyAUSDincome_address && ACAinstance)
  {
    console.log("Getting ntt54StgyAUSDincome ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(ntt54StgyAUSDincome_address);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    console.log(`Getting ntt54StgyAUSDincome ACA_BalanceWEI:${ACA_BalanceWEI}  ACA_Balance:${ACA_Balance}`);

    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyDOT_ACA_Balance = async () => {
  if (ntt54StgyDOTincome_address && ACAinstance)
  {
    console.log("Getting ntt54StgyDOTincome ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(ntt54StgyDOTincome_address);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyACA_ACA_Balance = async () => {
  if (ntt54StgyACAincome_address && ACAinstance)
  {
    console.log("Getting ntt54StgyACAincome ACA Balance Please wait");
    const ACA_BalanceWEI = await ACAinstance.balanceOf(ntt54StgyACAincome_address);
    const ACA_Balance    = formatUnits(ACA_BalanceWEI.toString()   , 12);
    return Number(ACA_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyAUSD_DOT_Balance = async () => {
  if (ntt54StgyAUSDincome_address && DOTinstance)
  {
    console.log("Getting getStrategyAUSD_DOT_Balance DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(ntt54StgyAUSDincome_address);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyDOT_DOT_Balance = async () => {
  if (ntt54StgyDOTincome_address && DOTinstance)
  {
    console.log("Getting getStrategyDOT_DOT_Balance DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(ntt54StgyDOTincome_address);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}

const getStrategyACA_DOT_Balance = async () => {
  if (ntt54StgyACAincome_address && DOTinstance)
  {
    console.log("Getting getStrategyACA_DOT_Balance DOT Balance Please wait");
    const DOT_BalanceWEI = await DOTinstance.balanceOf(ntt54StgyACAincome_address);
    const DOT_Balance    = formatUnits(DOT_BalanceWEI.toString()   , 10);
    return Number(DOT_Balance).toFixed(3);
  }
  else return null;
}

// depositToStrategyForACA
const depositToStrategyForACA = async (amount) => {
  const amountWEI = parseUnits(amount,10);   //deposits DOT
  console.log(`Running depositToStrategyForACA for amountWEI:${amountWEI} amount:${amount} ntt54StgyAUSDincome_address:${ntt54StgyAUSDincome_address}`);

  return new Promise( async (resolve,reject) => {
    const tx = await DOTinstance.approve(ntt54StgyAUSDincome_address, amountWEI);
 
    tx.wait().then( async (message) => {
       console.log(`depositToStrategyForACA has been completed message: `,message);

         const tx2 = await ntt54StgyAUSDincome.depositDOT(amountWEI);
         tx2.wait().then( message2 => {
           console.log(`depositToStrategyForACA message2: `,message2);
           resolve(message2);
         })
         .catch( error => reject(error));
       
    })
    .catch( error => reject(error));

  })

}


const depositToStrategyForDOT = async (amount) => {
}

const depositToStrategyForAUSD = async (amount) => {
}



const startStakingContract = async () => {
  if (ntt54_StakeDOT)
  {
    console.log(`Running startStakingContract `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54_StakeDOT.startDistributing();
      tx.wait().then( message => {
        console.log(`startStakingContract message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};


const stopStakingContract = async () => {
  if (ntt54_StakeDOT)
  {
    console.log(`Running stopStakingContract `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54_StakeDOT.stopDistributing();
      tx.wait().then( message => {
        console.log(`stopStakingContract message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};


const startStrategyReceiveAUSD = async () => {
  if (ntt54StgyAUSDincome_address && ntt54StgyAUSDincome)
  {
    console.log(`Running startStrategyReceiveAUSD `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54StgyAUSDincome.startManagingProcees();
      tx.wait().then( message => {
        console.log(`startStrategyReceiveAUSD message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};

const stopStrategyReceiveAUSD = async () => {
  if (ntt54StgyAUSDincome_address && ntt54StgyAUSDincome)
  {
    console.log(`Running stopStrategyReceiveAUSD `);
    return new Promise( async (resolve,reject) => {
      const tx = await ntt54StgyAUSDincome.stopManagingProcees();
      tx.wait().then( message => {
        console.log(`stopStrategyReceiveAUSD message: `,message);
        resolve(message);
      })
      .catch( error => reject(error));

    })
  }
  
};



export {
  setInstances,
  getBasicInfo,
  depositToTreasuryStakingContract,
  withdrawFromTreasury,
  updateTreasuryRewardPerEpoch,
  getAccount_ACA_Balance,
  getAccount_AUSD_Balance,
  getAccount_DOT_Balance,
  getAccount_STR1_Balance,
  getAccount_STR2_Balance,
  getAccount_STR3_Balance,
  depositToStrategyForACA,
  depositToStrategyForDOT,
  depositToStrategyForAUSD,

  getStrategyAUSD_AUSD_Balance,
  getStrategyDOT_AUSD_Balance,
  getStrategyACA_AUSD_Balance,
  getStrategyAUSD_ACA_Balance,
  getStrategyDOT_ACA_Balance,
  getStrategyACA_ACA_Balance,
	getStrategyAUSD_DOT_Balance, 
  getStrategyDOT_DOT_Balance,
  getStrategyACA_DOT_Balance,
  deposit_FeesToStakingContract, 
  deposit_FeesToStrategyAUSD,
  startStrategyReceiveAUSD,
  stopStrategyReceiveAUSD,
  startStakingContract,
  stopStakingContract,

}