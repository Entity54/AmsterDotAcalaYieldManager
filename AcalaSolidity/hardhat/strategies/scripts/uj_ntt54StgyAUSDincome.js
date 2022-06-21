 //***** Smart Contract Address *****/
const ntt54StakeDOT_address = "0x466cE828C7C1905C9919F41a0FCABCd319Ab1562"
const ntt54StgyAUSDincome_address = "0xf7C49b4Cf71f8316aE58c4bD014C985C5535D2c1"
 //*****/

 const { calcEthereumTransactionParams } = require("@acala-network/eth-providers");
 const { ACA, DOT, AUSD, DEX, Schedule } = require("@acala-network/contracts/utils/Address");
 const { Contract } = require("ethers");
 const { formatUnits, parseUnits } = require("ethers/lib/utils");
 
 const DEXContract = require("@acala-network/contracts/build/contracts/DEX.json");
 const TokenContract = require("@acala-network/contracts/build/contracts/Token.json");
 
 const ntt54StakeDOTArtifact = require("../artifacts/contracts/ntt54StakeDOT.sol/ntt54StakeDOT.json");
 const ntt54StgyAUSDincomeArtifact = require("../artifacts/contracts/ntt54StgyAUSDincome.sol/ntt54StgyAUSDincome.json");
 
  
 const txFeePerGas = '199999946752';
 const storageByteDeposit = '100000000000000'; 
 
  
 async function main() {
 
   console.log(`********************************************************`);
 
   let blockNumber = await ethers.provider.getBlockNumber();
   const ethParams = calcEthereumTransactionParams({
     gasLimit: '21000010',
     validUntil: (blockNumber + 100).toString(),
     storageLimit: '640010',
     txFeePerGas,
     storageByteDeposit
   });
 
   //Instantiate smart contract
   console.log("Getting signers");
   
   
   const [deployer, alice] = await ethers.getSigners();
   const deployerAddress = await deployer.getAddress();
   const aliceAddress = await alice.getAddress();
   console.log(`Address of the deployer is: ${deployerAddress} alice: ${aliceAddress}`);
   console.log("");
   console.log("");
 
   console.log("Instantiating DEX and token smart contracts");
   const DEXinstance  = new Contract(DEX, DEXContract.abi, deployer);
   const ACAinstance  = new Contract(ACA, TokenContract.abi, deployer);
   const AUSDinstance = new Contract(AUSD, TokenContract.abi, deployer);
   const DOTinstance  = new Contract(DOT, TokenContract.abi, deployer);
   console.log("DEX instantiated with address", DEXinstance.address);
   console.log("ACA token instantiated with address", ACAinstance.address);
   console.log("AUSD token instantiated with address", AUSDinstance.address);
   console.log("DOT token instantiated with address", DOTinstance.address);
   console.log("");
   console.log("");
 
   const ntt54StakeDOTinstance = new Contract(scAddress, ntt54StakeDOTArtifact.abi, deployer);
   console.log("ntt54StakeDOT is deployed at address:", ntt54StakeDOTinstance.address);
   console.log("");
   console.log("");
 
   console.log("Getting inital token balances");
   const initialAcaBalance = await ACAinstance.balanceOf(deployer.address);
   const initialAusdBalance = await AUSDinstance.balanceOf(deployer.address);
   const initialDotBalance = await DOTinstance.balanceOf(deployer.address);
 
   const initialDotBalance2 = await ntt54StakeDOTinstance.balanceOf(deployer.address);
 
 
   console.log("Inital %s ACA balance: %s ACA", deployer.address, formatUnits(initialAcaBalance.toString(), 12));
   console.log("Inital %s AUSD balance: %s AUSD", deployer.address, formatUnits(initialAusdBalance.toString(), 12));
   console.log("Inital %s DOT balance: %s DOT", deployer.address, formatUnits(initialDotBalance.toString(), 10));
   console.log("");
   console.log("");
 
   console.log("Getting liquidity pools");
     const initialAcaAusdLP = await instance.getLiquidityPool(ACA, AUSD);
     const initialAcaDotLP  = await instance.getLiquidityPool(ACA, DOT);
     const initialDotAusdLP = await instance.getLiquidityPool(DOT, AUSD);
     const initialLDotAusdLP = await instance.getLiquidityPool(LDOT, AUSD);
       const initialRenBtcAusdLP = await instance.getLiquidityPool(RENBTC, AUSD);
       const initiaKSMKusdLP = await instance.getLiquidityPool(KSM, KUSD);
       const initialKARKusdLP = await instance.getLiquidityPool(KAR, KUSD);
       const initiaLKSMKusdLP = await instance.getLiquidityPool(LKSM, KUSD);
 
     console.log("Initial ACA - AUSD liquidity pool: %s ACA - %s AUSD", formatUnits(initialAcaAusdLP[0].toString(), 12), formatUnits(initialAcaAusdLP[1].toString(), 12));
     console.log("Initial ACA - DOT liquidity pool: %s ACA - %s DOT", formatUnits(initialAcaDotLP[0].toString(), 12), formatUnits(initialAcaDotLP[1].toString(), 12));
     console.log("Initial DOT - AUSD liquidity pool: %s DOT - %s AUSD", formatUnits(initialDotAusdLP[0].toString(), 12), formatUnits(initialDotAusdLP[1].toString(), 12));
     console.log("Initial LDOT - AUSD liquidity pool: %s LDOT - %s AUSD", formatUnits(initialLDotAusdLP[0].toString(), 12), formatUnits(initialLDotAusdLP[1].toString(), 12));
       console.log("Initial RENBTC - AUSD liquidity pool: %s RENBTC - %s AUSD", formatUnits(initialRenBtcAusdLP[0].toString(), 12), formatUnits(initialRenBtcAusdLP[1].toString(), 12));
       console.log("Initial KSM - KUSD liquidity pool: %s KSM - %s KUSD", formatUnits(initiaKSMKusdLP[0].toString(), 12), formatUnits(initiaKSMKusdLP[1].toString(), 12));
       console.log("Initial KAR - KUSD liquidity pool: %s KAR - %s KUSD", formatUnits(initialKARKusdLP[0].toString(), 12), formatUnits(initialKARKusdLP[1].toString(), 12));
       console.log("Initial LKSM - KUSD liquidity pool: %s LKSM - %s KUSD", formatUnits(initiaLKSMKusdLP[0].toString(), 12), formatUnits(initiaLKSMKusdLP[1].toString(), 12));
     console.log("");
     console.log("");
 
 
     console.log("Getting liquidity pool token addresses");
     const acaAusdLPTokenAddress = await instance.getLiquidityTokenAddress(ACA, AUSD);
     const acaDotLPTokenAddress = await instance.getLiquidityTokenAddress(ACA, DOT);
     const dotAusdLPTokenAddress = await instance.getLiquidityTokenAddress(DOT, AUSD);
     const ldotAusdLPTokenAddress = await instance.getLiquidityTokenAddress(LDOT, AUSD);
     console.log("Liquidity pool token address for ACA - AUSD:", acaAusdLPTokenAddress);
     console.log("Liquidity pool token address for ACA - DOT:" , acaDotLPTokenAddress);
     console.log("Liquidity pool token address for DOT - AUSD:", dotAusdLPTokenAddress);
     console.log("Liquidity pool token address for LDOT - AUSD:", ldotAusdLPTokenAddress);
     console.log("");
     console.log("");
   
   
     //DOES NOT WORK BECAUSE THE INCETIVE PRECOMPILE IS NOT DEPLOYED
     // console.log(`DEX ACA_DOT Pool`);
     // const reward_amount = await incentives.getIncentiveRewardAmount( 1, acaDotLPTokenAddress, ACA);
     // const reward_amount = await incentives.getIncentiveRewardAmount( 1, acaAusdLPTokenAddress, ACA);
     // console.log(`DEX ACA_DOT Pool reward_amount: `,reward_amount);
     // const dex_reward_rate = await incentives.getDexRewardRate(ACA);
     // console.log(`DEX ACA_DOT Pool dex_reward_rate: `,dex_reward_rate);
 
 }
 
 main()
   .then(() => {
     // process.exit(0);
   })
   .catch((error) => {
     console.error(error);
     // process.exit(1);
   });