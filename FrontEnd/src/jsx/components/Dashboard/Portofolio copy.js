import React,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';

import { ThemeContext } from "../../../context/ThemeContext";
import QuickTransfer from '../Boltz/Home/ntt54_QuickTransfer';

// import { depositToTreasuryStakingContract, updateTreasuryRewardPerEpoch, withdrawFromTreasury, getBasicInfo,
// 	    getSmartContractFeesBalances, deposit_FeesToStrategyAUSD, 
// } from '../../../ntt54_accounts.js';         
 
const Portofolio = ({ 

}) =>{
	const { background } = useContext(ThemeContext);
	
	// 	const updateData = async () => {



	return(
		<>
			<div styles={{overflowY:"left"}}>

			<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
				{/* <h2 className="font-w600 mb-0 me-auto mb-2">DOT Depository</h2> */}
				<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					<input type="text" value = {"fundAmount"} placeholder="Amount To Finance Treasury" className="form-control" style={{color:"white", width:"350px"}} onChange={(event) => { 
										// setFundAmount(event.target.value);
									   }
									} />
				</Link>
				<Link to={"#"} className="btn btn-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					{/* <button className="btn-primary" style={{border: "none", backgroundColor:"#4E0891", color:"white"}} disabled = { swapWithExactSupply_IsSubmiting } onClick = { () => faucetMyAccount() }>Register Account</button>  */}
					<button className="btn-primary" style={{border: "none", color:"white"}}  onClick = { () =>  console.log("somehting")
						// approveAndFinanceTresury() 
						}>Approve & Finance Treasury</button> 
				</Link>
			</div>

			<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
				{/* <h2 className="font-w600 mb-0 me-auto mb-2"></h2> */}
				<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					<input type="text" value = {"withdrawAmount"} placeholder="Withdraw Amount" className="form-control" style={{color:"white", width:"350px"}} onChange={(event) => { 
										// setWithdrawAmount(event.target.value);
									   }
									} />
				</Link>
				<Link to={"#"} className="btn btn-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					{/* <button className="btn-primary" style={{border: "none", backgroundColor:"#4E0891", color:"white"}} disabled = { swapWithExactSupply_IsSubmiting } onClick = { () => faucetMyAccount() }>Register Account</button>  */}
					<button className="btn-primary" style={{border: "none", color:"white"}}  onClick = { () =>  console.log("somehting")
						// withdrawFundsFromTreasury() 
						}>Withdraw Funds From Treasury</button> 
				</Link>
			</div>


			<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
				{/* <h2 className="font-w600 mb-0 me-auto mb-2"></h2> */}
				<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					<input type="text" value = {"newRewardPerBlock"} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"350px"}} onChange={(event) => { 
										// setNewRewardPerBlock(event.target.value);
									   }
									} />
				</Link>
				<Link to={"#"} className="btn btn-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					{/* <button className="btn-primary" style={{border: "none", backgroundColor:"#4E0891", color:"white"}} disabled = { swapWithExactSupply_IsSubmiting } onClick = { () => faucetMyAccount() }>Register Account</button>  */}
					<button className="btn-primary" style={{border: "none", color:"white"}}  onClick = { () => console.log("somehting")
						// updateRewardPerEpock()  
						}>Update Reward Per Epoch</button> 
				</Link>
			</div>

			<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
				{/* <h2 className="font-w600 mb-0 me-auto mb-2"></h2> */}
				<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					<input type="text" value = {feesForStrategyAUSD} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"350px"}} onChange={(event) => { 
										// setFeesForStrategyAUSD(event.target.value);
									   }
									} />
				</Link>
				<Link to={"#"} className="btn btn-primary me-3 mb-2 rounded">
					{/* <i className="las la-calendar scale5 me-2"></i>Filter Periode */}
					{/* <button className="btn-primary" style={{border: "none", backgroundColor:"#4E0891", color:"white"}} disabled = { swapWithExactSupply_IsSubmiting } onClick = { () => faucetMyAccount() }>Register Account</button>  */}
					<button className="btn-primary" style={{border: "none", color:"white"}}  onClick = { () => console.log("somehting")
						// AprooveAndPaysFeeStrategyAUSD() 
						}>Approve and Pays SrategyAUSD Fees</button> 
				</Link>
			</div>

			</div>
 

 		<div styles={{overflowY:"Right"}}>
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				{/* <h2 className="font-w600 mb-2 me-auto">DOT Depositary</h2> */}
			</div>
			<div className="row">
				<div className="col-xl-6 col-xxl-8">

					<div className="card">
						<div className="card-header border-0 pb-0">
							<h4 className="mb-0 fs-20 text-black">Balances </h4>
							{/* <h4 className="mb-0 fs-20 text-black">Balances ${totalPortfolioValue?totalPortfolioValue:0}</h4> */}

						</div>

						<div className="card-body" style={{overflowY: "scroll", height:"400px"}}>
							{/* {"myPortfolio"} */}

						<div key={1} className="bg-gradient-1 coin-holding flex-wrap" style={{height:"70px", marginBottom:"15px", backgroundColor:""}}>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6" >Treasury Pool </p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">

							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">ACA</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">

							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">{"treasuryBalances"}</p>
										{/* <p className="mb-0 op-6">{"feesBalances[0].NumTokens"}</p> */}

									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black">RewardsPerBlock</p>	
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black">{"rewardPerBlock"}</p>	
								</div>
							</div>
						</div>
					</div>

					<div key={2} className="bg-gradient-1 coin-holding flex-wrap" style={{height:"70px", marginBottom:"15px", backgroundColor:""}}>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6" >Staked</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">DOT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">{"dotStakedBalance"}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black">Epoch</p>	
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black">{"stakeEpochNumber"}</p>	
								</div>
							</div>
						</div>
					</div>

					{/* <div style={{marginBottom:"10px"}}>
						{"Treasury Staking Rewards"}
					</div>
					<div key={3} className="bg-gradient-1 coin-holding flex-wrap" style={{height:"70px", marginBottom:"15px", backgroundColor:""}}>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6" >Epoch</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">{stakeEpochNumber}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<div className="ms-3">
										<p className="mb-0 op-6">__</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black">__</p>	
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-xxl-3">
							<div className="mb-2">
								<div className="d-flex align-items-center">
									<p className="mb-0 ms-2 font-w400 text-black"></p>	
								</div>
							</div>
						</div>
					</div> */}


						</div>
					</div>

				</div>

				{/* <div className="col-xl-6 col-xxl-12">
						<QuickTransfer getSmartContactBalances={getSmartContactBalances} willAdmin={willAdmin} ntt54Will_address={ntt54Will_address} currentAccount={currentAccount} provider={provider} wallet={wallet} ntt54Will={ntt54Will} setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader}/>
				</div> */}
			</div>	
		</div>	

		</>
	)
}
export default Portofolio; 