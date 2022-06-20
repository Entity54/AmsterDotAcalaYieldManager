import React,{useState,useContext, useEffect} from 'react';
 
import { ThemeContext } from "../../../context/ThemeContext";
import { Card,  Tab, Nav } from "react-bootstrap";

import EVMAcalaUI1 from '../Boltz/Home/ntt54_EVM_Acala_UI_1';
import EVMAcalaUI2 from '../Boltz/Home/ntt54_EVM_Acala_UI_2';


import { depositToTreasuryStakingContract, updateTreasuryRewardPerEpoch, withdrawFromTreasury, getSmartContractFeesBalances, getBasicInfo,
	// getAccount_ACA_Balance, getAccount_AUSD_Balance, getAccount_DOT_Balance, 
	// getAccount_STR1_Balance, getAccount_STR2_Balance, getAccount_STR3_Balance,
	// getStrategyAUSD_ACA_Balance, getStrategyDOT_ACA_Balance, getStrategyACA_ACA_Balance,
	// getStrategyAUSD_DOT_Balance, getStrategyDOT_DOT_Balance, getStrategyACA_DOT_Balance,
  } from '../../../ntt54_accounts.js';   



const DEX = ({ currentAccount, blockHeader, setupSpecs, portfolio, oracleData, accountList, 

	acaBalance, ausdBalance,  dotBalance,
	str1Balance, str2Balance, str3Balance,
	stg1AcaBalance,  stg2AcaBalance,  stg3AcaBalance,  
	stg1DOTBalance,  stg2DOTBalance, stg3DOTBalance,

}) => {
	const { changeBackground, background } = useContext(ThemeContext);

	// const [acaBalance , setAcaBalance]    = useState("");  
    // const [ausdBalance, setAusdBalance]   = useState("");  
    // const [dotBalance , setDotBalance]    = useState("");  

    // const [str1Balance , setStr1Balance]  = useState("");  
    // const [str2Balance , setStr2Balance]  = useState("");  
    // const [str3Balance , setStr3Balance]  = useState("");  

    // const [stg1AcaBalance , setSTG1AcaBalance]  = useState("");  
    // const [stg2AcaBalance , setSTG2AcaBalance]  = useState("");  
    // const [stg3AcaBalance , setSTG3AcaBalance]  = useState("");  


	// const [stg1DOTBalance , setStg1DOTBalance]  = useState("");  
    // const [stg2DOTBalance , setStg2DOTBalance]  = useState("");  
    // const [stg3DOTBalance , setStg3DOTBalance]  = useState("");  


    const [amountToStake , setAmountToStake]  = useState("");  


	// const getAllBalanceForAccount = async () => {
	// 	const acaBalance  = await getAccount_ACA_Balance(currentAccount);
	// 	const ausdBalance = await getAccount_AUSD_Balance(currentAccount);
	// 	const dotBalance  = await getAccount_DOT_Balance(currentAccount);

	// 	const str1Balance  = await getAccount_STR1_Balance(currentAccount);
	// 	const str2Balance  = await getAccount_STR2_Balance(currentAccount);
	// 	const str3Balance  = await getAccount_STR3_Balance(currentAccount);

	// 	const Stgy1_acaBalance  = await getStrategyAUSD_ACA_Balance();
	// 	const Stgy2_acaBalance  = await getStrategyDOT_ACA_Balance();
	// 	const Stgy3_acaBalance  = await getStrategyACA_ACA_Balance();

	// 	const Stgy1_dotBalance  = await getStrategyAUSD_DOT_Balance();
	// 	const Stgy2_dotBalance  = await getStrategyDOT_DOT_Balance();
	// 	const Stgy3_dotBalance  = await getStrategyACA_DOT_Balance();



	// 	setAcaBalance(acaBalance); setAusdBalance(ausdBalance); setDotBalance(dotBalance); setStr1Balance(str1Balance); setStr2Balance(str2Balance); setStr3Balance(str3Balance);
	// 	setSTG1AcaBalance(Stgy1_acaBalance); setSTG2AcaBalance(Stgy2_acaBalance); setSTG3AcaBalance(Stgy3_acaBalance); 
	// 	setStg1DOTBalance(Stgy1_dotBalance); setStg2DOTBalance(Stgy2_dotBalance); setStg3DOTBalance(Stgy3_dotBalance);
    // }

	const set_AmountToStake = (amount) => {
		setAmountToStake(amount);
	}

	// useEffect(() => {
	// 	if (blockHeader)
	// 	{
	// 		const mod5 = Number(blockHeader.number) % 5 ;
	// 		// console.log(`DEX BLOCKHEADER#: ${blockHeader.number}  mod5:${mod5}`);
	// 		if (mod5===0)
	// 		{
	// 			// console.log(`TIME TO UPDATE THE BALANCES and staking contract`);
	// 			getAllBalanceForAccount();
	// 		}
	// 	}

	// }, [blockHeader]);
	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);


	return(
		<>

<div className="col-xl-12">
					<div className="row"> 

						{/* LEFT PART OF THE SCREEN START */}
						<div className="col-xl-3"></div>
						<div className="col-xl-3 col-xxl-12">
							<br/>
							<Card style={{backgroundColor:"#0c0c0c", marginBottom:"0px"}}>
								<Card.Body>
								<div className="custom-tab-1" >
												<EVMAcalaUI1 
													currentAccount={currentAccount}
													// getAllBalanceForAccount={getAllBalanceForAccount}
													dotBalance={dotBalance}
													set_AmountToStake={set_AmountToStake}
													// accountList={accountList} blockHeader={blockHeader} 
												/>
								</div>
								</Card.Body>
							</Card>
						</div>
						{/* LEFT PART OF THE SCREEN END */}


						{/* RIGHT PART OF THE SCREEN START */}
						{/* <div className="col-xl-4 col-xxl-12"></div> */}
						<div className="col-xl-3 col-xxl-12">
							<EVMAcalaUI2 
							currentAccount={currentAccount}
							// getAllBalanceForAccount={getAllBalanceForAccount}
							acaBalance={acaBalance} ausdBalance={ausdBalance} dotBalance={dotBalance} 
							str1Balance={str1Balance} str2Balance={str2Balance} str3Balance={str3Balance}
							stg1AcaBalance={stg1AcaBalance} stg2AcaBalance={stg2AcaBalance} stg3AcaBalance={stg3AcaBalance}
							stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance}

							amountToStake={amountToStake}
							//setupSpecs={setupSpecs} accountList={accountList} blockHeader={blockHeader} 
							/>
						</div>
						{/* RIGHT PART OF THE SCREEN END*/}
					</div>

				</div>
				
		</>
	)
}
export default DEX;