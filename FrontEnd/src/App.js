import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';

import { ethers } from 'ethers';  
import { Contract } from 'ethers';

// import ntt54Will_raw from './Abis/ntt54Will';  
import ntt54StakeDOT_raw from './Abis/ntt54StakeDOT';      
import ntt54StgyAUSDincome_raw from './Abis/ntt54StgyAUSDincome';      

//METAMASK
import detectEthereumProvider from '@metamask/detect-provider'; // FOR METAMASK TO BE USED This function detects most providers injected at window.ethereum

import {  setInstances,  
  getBasicInfo,
	getAccount_ACA_Balance, getAccount_AUSD_Balance, getAccount_DOT_Balance, 
	getAccount_STR1_Balance, getAccount_STR2_Balance, getAccount_STR3_Balance,
	getStrategyAUSD_ACA_Balance, getStrategyDOT_ACA_Balance, getStrategyACA_ACA_Balance,
	getStrategyAUSD_DOT_Balance, getStrategyDOT_DOT_Balance, getStrategyACA_DOT_Balance,

} from './ntt54_accounts.js';         

/// Components
import Index from "./jsx";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";



// ************ ntt54 smart contracts ************
// const ntt54Will_address = "0xD98d06454590B1508dFf6F3DDb63594A89fD28Bd";

const ntt54StakeDOT_address       = "0xA1720056337E496F2e34837bF745D6e89ac427BA"
const ntt54StgyAUSDincome_address = "0xD8190A936d0bA8cBAD9b279B0A3BEf1AB466DdA2"
// ************ ntt54 smart contracts ************



function App (props) {
    const [provider,setProvider] = useState(null);
    const [chainId,setChainId] = useState(null);
    // const [willAdmin,setWillAdmin] = useState(null);
    const [currentAccount,setCurrentAccount] = useState(null);
    const [wallet,setWallet] = useState(null);
    // const [ntt54Will,setNtt54Will] = useState(null);

    const [setupSpecs,setSetupSpecs]            = useState({ wallet: null, provider: null, pair: null, connected: "Not connected", walletAddress: null });
    // const [blockChainSpecs,setBlockChainSpecs]  = useState({ networkName: undefined, chainID: undefined, blockNumber: undefined, gasPrice: undefined});
    const [blockHeader, setBlockHeader]         = useState({ number: undefined , hash: undefined, size: undefined });
    // const [oracleData,setOracleData] = useState({ _tickers: undefined, _tiks: undefined, timestamp: undefined, _prices: undefined, mcs: undefined, tokenAddresses: undefined, tickersStrings: undefined, tiksString: undefined, pricesBaseCur: undefined });
    // const [oracleSC, setOracleSC]                = useState({ sc_ntt54_Oracle: undefined , singer_sc_ntt54_Oracle: undefined, address: undefined});

    const [evm_api_state,setEvm_Api_State] = useState(false);
    const [accountList, setAccountList] = useState();  //stores the list of accounts from the extensions
    const [accountBalance, setAccountBalance] = useState();
    // const [portfolio, setPortfolio] = useState(undefined);

    // const [blockTimestamp, setBlockTimestamp]   = useState(undefined);
    // const [selectedAccountName, setSelectedAccountName] = useState("");

    //THESE ARE USED TO RESTRICT UPDATING PORTFOLIO BANALNCE TO ONCE EVERY portfolioUpdateBlockNumberFrequency BLOCKS INSTEAD OF EVERY BLOCK
    // const [lastupdate_blocknumber, setLastupdate_blocknumber]   = useState(0);
    // const [portfolioUpdateBlockNumberFrequency, setPortfolioUpdateBlockNumberFrequency]   = useState(20);

 

    const [acaBalance , setAcaBalance]    = useState("");  
    const [ausdBalance, setAusdBalance]   = useState("");  
    const [dotBalance , setDotBalance]    = useState("");  

    const [str1Balance , setStr1Balance]  = useState("");  
    const [str2Balance , setStr2Balance]  = useState("");  
    const [str3Balance , setStr3Balance]  = useState("");  

    const [stg1AcaBalance , setSTG1AcaBalance]  = useState("");  
    const [stg2AcaBalance , setSTG2AcaBalance]  = useState("");  
    const [stg3AcaBalance , setSTG3AcaBalance]  = useState("");  

	  const [stg1DOTBalance , setStg1DOTBalance]  = useState("");  
    const [stg2DOTBalance , setStg2DOTBalance]  = useState("");  
    const [stg3DOTBalance , setStg3DOTBalance]  = useState("");  

    const [treasuryBalances,setTreasuryBalances] = useState("0");
    const [dotStakedBalance,setDotStakedBalance] = useState("0");
    const [rewardPerBlock,setRewardPerBlock] = useState("0");
    const [stakeEpochNumber,setStakeEpochNumber] = useState("0");



    const getAllBalanceForAccount = async () => {
      console.log(`App => getAllBalanceForAccount running`)
      const acaBalance  = await getAccount_ACA_Balance(currentAccount);
      const ausdBalance = await getAccount_AUSD_Balance(currentAccount);
      const dotBalance  = await getAccount_DOT_Balance(currentAccount);
  
      const str1Balance  = await getAccount_STR1_Balance(currentAccount);
      const str2Balance  = await getAccount_STR2_Balance(currentAccount);
      const str3Balance  = await getAccount_STR3_Balance(currentAccount);
  
      const Stgy1_acaBalance  = await getStrategyAUSD_ACA_Balance();
      const Stgy2_acaBalance  = await getStrategyDOT_ACA_Balance();
      const Stgy3_acaBalance  = await getStrategyACA_ACA_Balance();
  
      const Stgy1_dotBalance  = await getStrategyAUSD_DOT_Balance();
      const Stgy2_dotBalance  = await getStrategyDOT_DOT_Balance();
      const Stgy3_dotBalance  = await getStrategyACA_DOT_Balance();
  
      console.log(`App => acaBalance ${acaBalance}`)
  
  
      setAcaBalance(acaBalance); setAusdBalance(ausdBalance); setDotBalance(dotBalance); setStr1Balance(str1Balance); setStr2Balance(str2Balance); setStr3Balance(str3Balance);
      setSTG1AcaBalance(Stgy1_acaBalance); setSTG2AcaBalance(Stgy2_acaBalance); setSTG3AcaBalance(Stgy3_acaBalance); 
      setStg1DOTBalance(Stgy1_dotBalance); setStg2DOTBalance(Stgy2_dotBalance); setStg3DOTBalance(Stgy3_dotBalance);
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
            
            console.log(`MetaMask Setup ***> account:${account} balanceAccount: ${balanceAccount} Wallet address that signs transactions: ${await wallet.getAddress()} walletBalance: ${ ethers.utils.formatUnits( walletBalance, 18 )} walletChainID: ${walletChainID} nonce:${nonce}`);
            console.log(`MetaMask Setup ***>  (await provider.getNetwork()).chainId: ${(await provider.getNetwork()).chainId} getBlockNumber: ${await provider.getBlockNumber()} gasPrice: ${gasPrice.toString()}`);
           
            // //set instances
                // const ntt54_Will = new Contract(ntt54Will_address    , ntt54Will_raw.abi  , wallet);
            const ntt54_StakeDOT = new Contract(ntt54StakeDOT_address    , ntt54StakeDOT_raw.abi  , wallet);
            const ntt54StgyAUSDincome = new Contract(ntt54StgyAUSDincome_address    , ntt54StgyAUSDincome_raw.abi  , wallet);

            // const ntt54_StakeDOT_Admin  = await ntt54_StakeDOT.admin();
            // const ntt54StgyAUSDincome_Admin  = await ntt54StgyAUSDincome.admin();


            // const will_Admin  = await ntt54_Will.willAdmin();
            // setWillAdmin(will_Admin);
            // setNtt54Will(ntt54_Will);
            // console.log(`Will Administrators: ${will_Admin}`);

            await setInstances(
              // will_Admin, 
              wallet, provider, 
              // ntt54_Will, 
              ntt54_StakeDOT, ntt54StgyAUSDincome, null, null, 
              ntt54StakeDOT_address, ntt54StgyAUSDincome_address, null, null);
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
            console.log(`MetaMask mm_chainId: `,mm_chainId);

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
          const balanceAccount_BigNumber = await provider.getBalance(currentAccount);
          const balanceAccount =  ethers.utils.formatUnits( balanceAccount_BigNumber, 18 );
          setAccountBalance(balanceAccount);
      }
  }, [provider, currentAccount]);   

   

  //#region  parachain events setup WORKING BUT COMMENTED OUT FOR DEVELOPMENT
  useEffect(() => {

    const parachain = async (provider) => {
        console.log(`||||||||||||||||||||=========> App.js AcalamandalaTC7 Parachain is run at  Timestmap: ${new Date()}`);
        //Subscribe to the new headers on-chain.   
        provider.on("block", async (blockNumber) => {
            console.log(`AcalamandalaTC7 PROVIDER EVENT block blockNumber: ${blockNumber}`);
            setBlockHeader({number: `${blockNumber}`, hash: `header.hash`, size: "header.size"});


            // if (blockHeader)
            // {
              const mod5 = Number(blockNumber) % 5 ;
              // console.log(`DEX BLOCKHEADER#: ${blockHeader.number}  mod5:${mod5}`);
              if (mod5===0)
              {
                console.log(`TIME TO UPDATE THE BALANCES and staking contract`);
                getAllBalanceForAccount();

                const stakeDOTinfo = await getBasicInfo();
                if (stakeDOTinfo)
                {
                  const {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance} = stakeDOTinfo;
                  // console.log(`ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber}`)
                  setTreasuryBalances(treasuryBalances); setRewardPerBlock(REWARD_PER_BLOCK); setStakeEpochNumber(epochNumber); setDotStakedBalance(dot_StakedBalance)
                }
              }
            // }




        });
    }

    if (provider) 
    {
      const jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://tc7-eth.aca-dev.network");
          parachain(jsonRpcProvider).catch((er) => { console.log(`APP.JS parachain Error: `,er);  });
      // parachain(provider).catch((er) => { console.log(`APP.JS parachain Error: `,er);  });
    }
    else console.log(`App.js => setupSpecs.provider is undefined`);
  // }, [provider,ntt54Will]); 
  }, [provider]);  

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
                           currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={"ntt54Will"}   
                           setupSpecs={setupSpecs} blockHeader={blockHeader} accountList={accountList} evm_api_state={evm_api_state}

                           acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} 
                           str1Balance={str1Balance}  str2Balance={str2Balance}  str3Balance={str3Balance}  
                           stg1AcaBalance={stg1AcaBalance}  stg2AcaBalance={stg2AcaBalance}  stg3AcaBalance={stg3AcaBalance}  
                           stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance}

                            treasuryBalances={treasuryBalances} dotStakedBalance={dotStakedBalance} rewardPerBlock={rewardPerBlock} stakeEpochNumber={stakeEpochNumber}
                           />
                </Suspense>
            </>
        );
	
};


export default App;