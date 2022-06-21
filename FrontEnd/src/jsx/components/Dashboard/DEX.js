import React,{useState,useContext, useEffect} from 'react';
import { ThemeContext } from "../../../context/ThemeContext";
import { Card,  Tab, Nav } from "react-bootstrap";

import EVMAcalaUI1 from '../Boltz/Home/ntt54_EVM_Acala_UI_1';
import EVMAcalaUI2 from '../Boltz/Home/ntt54_EVM_Acala_UI_2';


const DEX = ({ currentAccount, acaBalance, ausdBalance,  dotBalance, str1Balance, str2Balance, str3Balance,
			   stg1AusdBalance,  stg2AusdBalance,  stg3AusdBalance,  
			   stg1DOTBalance,  stg2DOTBalance, stg3DOTBalance, stg1ACABalance, stg2ACABalance, stg3ACABalance,
			   getAllBalanceForAccount,
}) => {
	const { changeBackground, background } = useContext(ThemeContext);
    const [amountToStake , setAmountToStake]  = useState("");  

	const set_AmountToStake = (amount) => {
		setAmountToStake(amount);
	}
	
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
							<Card style={{backgroundColor:"#0c0c0c", marginBottom:"0px",  marginTop:"-20px"}}>
								<Card.Body>
								<div className="custom-tab-1" >
												<EVMAcalaUI1 
													dotBalance={dotBalance}
													set_AmountToStake={set_AmountToStake}
												/>
								</div>
								</Card.Body>
							</Card>
						</div>
						{/* LEFT PART OF THE SCREEN END */}


						{/* RIGHT PART OF THE SCREEN START */}
						<div className="col-xl-3 col-xxl-12">
							<EVMAcalaUI2 
								acaBalance={acaBalance} ausdBalance={ausdBalance} dotBalance={dotBalance} 
								str1Balance={str1Balance} str2Balance={str2Balance} str3Balance={str3Balance}
								stg1AusdBalance={stg1AusdBalance}  stg2AusdBalance={stg2AusdBalance}  stg3AusdBalance={stg3AusdBalance} 
								stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance} stg1ACABalance={stg1ACABalance} stg2ACABalance={stg2ACABalance} stg3ACABalance={stg3ACABalance}
								amountToStake={amountToStake} getAllBalanceForAccount={getAllBalanceForAccount} currentAccount={currentAccount}
							/>
						</div>
						{/* RIGHT PART OF THE SCREEN END*/}
					</div>

				</div>
				
		</>
	)
}
export default DEX;