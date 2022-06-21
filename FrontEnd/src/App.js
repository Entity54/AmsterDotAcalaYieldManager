import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';

import { ethers } from 'ethers';  
import { Contract } from 'ethers';

import ntt54StakeDOT_raw from './Abis/ntt54StakeDOT';      
import ntt54StgyAUSDincome_raw from './Abis/ntt54StgyAUSDincome';      

//METAMASK
import detectEthereumProvider from '@metamask/detect-provider'; // FOR METAMASK TO BE USED This function detects most providers injected at window.ethereum

import {  setInstances,  
  getBasicInfo,
	getAccount_ACA_Balance, getAccount_AUSD_Balance, getAccount_DOT_Balance, 
	getAccount_STR1_Balance, getAccount_STR2_Balance, getAccount_STR3_Balance,
	getStrategyAUSD_AUSD_Balance, getStrategyDOT_AUSD_Balance, getStrategyACA_AUSD_Balance,
	getStrategyAUSD_DOT_Balance, getStrategyDOT_DOT_Balance, getStrategyACA_DOT_Balance,
  getStrategyAUSD_ACA_Balance, getStrategyDOT_ACA_Balance, getStrategyACA_ACA_Balance

} from './ntt54_accounts.js';         

/// Components
import Index from "./jsx";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";


// ************ ntt54 smart contracts ************
const ntt54StakeDOT_address       = "0xba1bEd9Cd1D186DD120761E4792c959132775363";
const ntt54StgyAUSDincome_address = "0x31Fa3382279C1485B25EE4b758FE0b02C0912098";
// ************ ntt54 smart contracts ************



function App (props) {
    const [provider,setProvider] = useState(null);
    const [chainId,setChainId] = useState(null);
    const [currentAccount,setCurrentAccount] = useState(null);
    const [wallet,setWallet] = useState(null);
    const [setupSpecs,setSetupSpecs]            = useState({ wallet: null, provider: null, pair: null, connected: "Not connected", walletAddress: null });
    // const [blockChainSpecs,setBlockChainSpecs]  = useState({ networkName: undefined, chainID: undefined, blockNumber: undefined, gasPrice: undefined});
    const [blockHeader, setBlockHeader]         = useState({ number: undefined , hash: undefined, size: undefined });
    const [evm_api_state,setEvm_Api_State] = useState(false);
    const [accountList, setAccountList] = useState();  //stores the list of accounts from the extensions

    const [acaBalance , setAcaBalance]    = useState("");  
    const [ausdBalance, setAusdBalance]   = useState("");  
    const [dotBalance , setDotBalance]    = useState("");  

    const [str1Balance , setStr1Balance]  = useState("");  
    const [str2Balance , setStr2Balance]  = useState("");  
    const [str3Balance , setStr3Balance]  = useState("");  

    const [stg1AusdBalance , setSTG1AusdBalance]  = useState("");  
    const [stg2AusdBalance , setSTG2AusdBalance]  = useState("");  
    const [stg3AusdBalance , setSTG3AusdBalance]  = useState("");  

	  const [stg1DOTBalance , setStg1DOTBalance]  = useState("");  
    const [stg2DOTBalance , setStg2DOTBalance]  = useState("");  
    const [stg3DOTBalance , setStg3DOTBalance]  = useState("");  

    const [stg1ACABalance , setStg1ACABalance]  = useState("");  
    const [stg2ACABalance , setStg2ACABalance]  = useState("");  
    const [stg3ACABalance , setStg3ACABalance]  = useState("");  

    const [treasuryBalances,setTreasuryBalances] = useState("0");
    const [dotStakedBalance,setDotStakedBalance] = useState("0");
    const [rewardPerBlock,setRewardPerBlock] = useState("0");
    const [stakeEpochNumber,setStakeEpochNumber] = useState("0");

    const [stakeContractState,setStakeContractState] = useState("0");
    const [stakeContractACABalance,setStakeContractACABalance] = useState("0");


  const getAllBalanceForAccount = async (accnt) => {
    // console.log(`App => getAllBalanceForAccount running  accnt: ${accnt}`);
    const acaBalance  = await getAccount_ACA_Balance(accnt);
    const ausdBalance = await getAccount_AUSD_Balance(accnt);
    const dotBalance  = await getAccount_DOT_Balance(accnt);

    const str1Balance  = await getAccount_STR1_Balance(accnt);
    const str2Balance  = await getAccount_STR2_Balance(accnt);
    const str3Balance  = await getAccount_STR3_Balance(accnt);

    const Stgy1_ausdBalance  = await getStrategyAUSD_AUSD_Balance();
    const Stgy2_ausdBalance  = await getStrategyDOT_AUSD_Balance();
    const Stgy3_ausdBalance  = await getStrategyACA_AUSD_Balance();

    const Stgy1_dotBalance  = await getStrategyAUSD_DOT_Balance();
    const Stgy2_dotBalance  = await getStrategyDOT_DOT_Balance();
    const Stgy3_dotBalance  = await getStrategyACA_DOT_Balance();

    const Stgy1_acaBalance  = await getStrategyAUSD_ACA_Balance();
    const Stgy2_acaBalance  = await getStrategyDOT_ACA_Balance();
    const Stgy3_acBalance   = await getStrategyACA_ACA_Balance();

    setAcaBalance(acaBalance); setAusdBalance(ausdBalance); setDotBalance(dotBalance); setStr1Balance(str1Balance); setStr2Balance(str2Balance); setStr3Balance(str3Balance);
    setSTG1AusdBalance(Stgy1_ausdBalance); setSTG2AusdBalance(Stgy2_ausdBalance); setSTG3AusdBalance(Stgy3_ausdBalance); 
    setStg1DOTBalance(Stgy1_dotBalance); setStg2DOTBalance(Stgy2_dotBalance); setStg3DOTBalance(Stgy3_dotBalance);
    setStg1ACABalance(Stgy1_acaBalance); setStg2ACABalance(Stgy2_acaBalance); setStg3ACABalance(Stgy3_acBalance);

  }


  //#region Setup MetaMask
  useEffect(() => {
      const listenMMAccount = async () => {

          const basicInfo = async (provider, wallet, account) => {
            const balanceAccount_BigNumber = await provider.getBalance(account);
            const balanceAccount =  ethers.utils.formatUnits( balanceAccount_BigNumber, 18 );
            const walletBalance = await wallet.getBalance(); // { BigNumber: "42" }
            const walletChainID = await wallet.getChainId(); //AMTC7 595 or 0x253   Returns the chain ID this wallet is connected to.  
            const gasPrice = await wallet.getGasPrice(); // 1000000000 Returns the current gas price. BigNumber   
            const nonce = await wallet.getTransactionCount(); //NONCE 73
            const walletAddress = await wallet.getAddress();
            console.log(`MetaMask Setup ***> account:${account} balanceAccount: ${balanceAccount} Wallet address that signs transactions: ${walletAddress} walletBalance: ${ ethers.utils.formatUnits( walletBalance, 18 )} walletChainID: ${walletChainID} nonce:${nonce}`);
            console.log(`MetaMask Setup ***>  (await provider.getNetwork()).chainId: ${(await provider.getNetwork()).chainId} getBlockNumber: ${await provider.getBlockNumber()} gasPrice: ${gasPrice.toString()}`);
           
            //set instances
            const ntt54_StakeDOT = new Contract(ntt54StakeDOT_address    , ntt54StakeDOT_raw.abi  , wallet);
            const ntt54StgyAUSDincome = new Contract(ntt54StgyAUSDincome_address    , ntt54StgyAUSDincome_raw.abi  , wallet);
            // const ntt54_StakeDOT_Admin  = await ntt54_StakeDOT.admin();
            // const ntt54StgyAUSDincome_Admin  = await ntt54StgyAUSDincome.admin();

            await setInstances(
                wallet, provider, 
                ntt54_StakeDOT, ntt54StgyAUSDincome, null, null, 
                ntt54StakeDOT_address, ntt54StgyAUSDincome_address, null, null
              );

            //here load balanaces for the first time
            await getAllBalanceForAccount(walletAddress);

          }

          let provider, wallet, mm_acounts, account;
          const _provider = await detectEthereumProvider();
          if (_provider) {
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");   
            setProvider(provider);
           
            provider.on("network", (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                    window.location.reload();
                }
            });

            mm_acounts = await _provider.request({ method: 'eth_requestAccounts' });
            console.log(`MetaMask Accounts Array: `,mm_acounts);
            setCurrentAccount(mm_acounts[0]);
            account = mm_acounts[0];

            const mm_chainId = await _provider.request({ method: 'eth_chainId' });
            setChainId(mm_chainId);
            console.log(`MetaMask mm_chainId: `,mm_chainId,` mm_acounts[0]: `,mm_acounts[0]);

            wallet = provider.getSigner(); 
            setWallet(wallet)

            basicInfo(provider, wallet, account);

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            function handleAccountsChanged(accounts) {
              if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.');
              } else if (accounts[0] !== currentAccount) {
                account = accounts[0]
                setCurrentAccount(accounts[0]);
                wallet = provider.getSigner(); 
                setWallet(wallet)
          
                basicInfo(provider, wallet, account);

                console.log(`******* current account: ${accounts[0]}`);
              }
            }

          } 
          else {  console.log('Please install MetaMask!');  }
      }
      listenMMAccount();
  }, []);
  //#endregion Setup MetaMask


  useEffect( async () => {
      if (provider && currentAccount)
      {
          setEvm_Api_State(true);
          setAccountList([currentAccount]);
      }
  }, [provider, currentAccount]);   


  let timeToUpDate = true;
  useEffect(() => {
    const blockUpdate = async () => {
        console.log(`||||> Inside New Block blockHeader.number: ${blockHeader.number}`); // currentAccount:${currentAccount}`);
    
        const mod5 = Number(blockHeader.number) % 5 ;
        if (mod5===0 && timeToUpDate)
        {
          timeToUpDate = false;
          console.log(`TIME TO UPDATE THE BALANCES and staking contract`);
          await getAllBalanceForAccount(currentAccount);
    
          const stakeDOTinfo = await getBasicInfo();
          if (stakeDOTinfo)
          {
            const {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance, contractState, stake_ContractACAbalance} = stakeDOTinfo;
            setTreasuryBalances(treasuryBalances); setRewardPerBlock(REWARD_PER_BLOCK); setStakeEpochNumber(epochNumber); setDotStakedBalance(dot_StakedBalance);  setStakeContractState(contractState);  setStakeContractACABalance(stake_ContractACAbalance);
            // console.log(`ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber}`)
            console.log(`EPOOCH --->==> ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber}`)

          }
        } else if (mod5!==0) timeToUpDate = true;
    }
    blockUpdate();

  }, [blockHeader]);  


  //#region  parachain events setup WORKING BUT COMMENTED OUT FOR DEVELOPMENT
  useEffect(() => {
    const parachain = async (provider) => {
        console.log(`||||||||||||||||||||=========> App.js AcalamandalaTC7 Parachain is run at  Timestmap: ${new Date()}`);
        //Subscribe to the new headers on-chain.   
        provider.on("block", async (blockNumber) => {
            // console.log(`AcalamandalaTC7 PROVIDER EVENT block blockNumber: ${blockNumber}`);
            setBlockHeader({number: `${blockNumber}`, hash: `header.hash`, size: "header.size"});
        });
    }

    const jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://tc7-eth.aca-dev.network");
    parachain(jsonRpcProvider).catch((er) => { console.log(`APP.JS parachain Error: `,er);  });
  }, []);  
  //#endregion  parachain events setup


    
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index 
                          currentAccount={currentAccount} provider={provider} wallet={wallet} setupSpecs={setupSpecs} blockHeader={blockHeader} accountList={accountList} evm_api_state={evm_api_state}
                          acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} str1Balance={str1Balance}  str2Balance={str2Balance}  str3Balance={str3Balance}  
                          stg1AusdBalance={stg1AusdBalance}  stg2AusdBalance={stg2AusdBalance}  stg3AusdBalance={stg3AusdBalance}  
                          stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance}
                          stg1ACABalance={stg1ACABalance} stg2ACABalance={stg2ACABalance} stg3ACABalance={stg3ACABalance}
                          treasuryBalances={treasuryBalances} dotStakedBalance={dotStakedBalance} rewardPerBlock={rewardPerBlock} stakeEpochNumber={stakeEpochNumber}
                          stakeContractState={stakeContractState} stakeContractACABalance={stakeContractACABalance}
                          getAllBalanceForAccount={getAllBalanceForAccount}
                    />
                </Suspense>
            </>
        );
	
};


export default App;