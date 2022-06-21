import React,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import PageTitle from "../../layouts/PageTitle";
import {
	Row,
	Col,
	Card,
	Button,
	ButtonGroup,
	Dropdown,
	DropdownButton,
  } from "react-bootstrap";

import { ThemeContext } from "../../../context/ThemeContext";
// import QuickTransfer from '../Boltz/Home/ntt54_QuickTransfer';

import { depositToTreasuryStakingContract, updateTreasuryRewardPerEpoch, withdrawFromTreasury,deposit_FeesToStrategyAUSD, startStrategyReceiveAUSD, 
	    stopStrategyReceiveAUSD, startStakingContract, stopStakingContract, deposit_FeesToStakingContract,
		// getSmartContractFeesBalances, getBasicInfo
} from '../../../ntt54_accounts.js';         
 
const Portofolio = ({ 
	treasuryBalances, dotStakedBalance, rewardPerBlock, stakeEpochNumber,  stakeContractState, stakeContractACABalance, getAllBalanceForAccount,
}) =>{
	const { background } = useContext(ThemeContext);
	const [fundAmount, setFundAmount] = useState("");
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [newRewardPerBlock, setNewRewardPerBlock] = useState("");
	const [feesForStrategyAUSD, setFeesForStrategyAUSD] = useState("");
	const [feesForStaker, setFeesForStaker] = useState("");





	const approveAndFinanceTresury = async () => {
		console.log(`We will now approveAndFinanceTresury Please wait... `);

		if (fundAmount!=="")
		{
			depositToTreasuryStakingContract(fundAmount)
			.then((res) => {
				console.log(`We have just called depositToTreasuryStakingContract for fundAmount: ${fundAmount} res: `,res);
			})
			.catch((er) => console.log(`Error in depositToTreasuryStakingContract: `,er));
		}
	}  

	const withdrawFundsFromTreasury = async () => {
		console.log(`We will now withdrawFundsFromTreasury Please wait... `);

		if (withdrawAmount!=="")
		{
			withdrawFromTreasury(withdrawAmount)
			.then((res) => {
				console.log(`We have just called withdrawFundsFromTreasury for withdrawAmount: ${withdrawAmount} res: `,res);
			})
			.catch((er) => console.log(`Error in withdrawFundsFromTreasury: `,er));
		}
	}  

	const updateRewardPerEpock = async () => {
		console.log(`We will now updateRewardPerEpock Please wait... `);

		if (newRewardPerBlock!=="")
		{
			updateTreasuryRewardPerEpoch(newRewardPerBlock)
			.then((res) => {
				console.log(`We have just called updateTreasuryRewardPerEpoch for newRewardPerBlock: ${newRewardPerBlock} res: `,res);
			})
			.catch((er) => console.log(`Error in updateTreasuryRewardPerEpoch: `,er));
		}
	}  
	

	const AprooveAndPaysFeeStaker = async () => {
		console.log(`We will now AprooveAndPaysFeeStaker Please wait... `);

		if (feesForStaker!=="")
		{
			deposit_FeesToStakingContract(feesForStaker)
			.then((res) => {
				console.log(`We have just called deposit_FeesToStakingContract for feesForStaker: ${feesForStaker} res: `,res);
			})
			.catch((er) => console.log(`Error in deposit_FeesToStakingContract: `,er));
		}
	}  

	const AprooveAndPaysFeeStrategyAUSD = async () => {
		console.log(`We will now AprooveAndPaysFeeStrategyAUSD Please wait... `);

		if (feesForStrategyAUSD!=="")
		{
			deposit_FeesToStrategyAUSD(feesForStrategyAUSD)
			.then((res) => {
				console.log(`We have just called deposit_FeesToStrategyAUSD for feesForStrategyAUSD: ${feesForStrategyAUSD} res: `,res);
			})
			.catch((er) => console.log(`Error in deposit_FeesToStrategyAUSD: `,er));
		}
	}  


	const startTheStakingContract = () => {
		startStakingContract()
		.then((res) => {
			console.log(`We have just called startStakingContract res: `,res);
		})
		.catch((er) => console.log(`Error in startStakingContract: `,er));
	}

	const stopTheStakingContract = () => {
		stopStakingContract()
		.then((res) => {
			console.log(`We have just called stopTheStakingContract res: `,res);
		})
		.catch((er) => console.log(`Error in stopTheStakingContract: `,er));
	}

	const startStrategyReceiveYieldinAUSD = () => {
		startStrategyReceiveAUSD()
		.then((res) => {
			console.log(`We have just called startStrategyReceiveYieldinAUSD res: `,res);
		})
		.catch((er) => console.log(`Error in startStrategyReceiveYieldinAUSD: `,er));
	}


	const stopStrategyReceiveYieldinAUSD = () => {
		stopStrategyReceiveAUSD()
		.then((res) => {
			console.log(`We have just called stopStrategyReceiveAUSD res: `,res);
		})
		.catch((er) => console.log(`Error in stopStrategyReceiveAUSD: `,er));
	}


	const startStrategyReceiveYieldinDOT = () => {
		// startStrategyReceiveAUSD()
		// .then((res) => {
		// 	console.log(`We have just called startStrategyReceiveYieldinAUSD res: `,res);
		// })
		// .catch((er) => console.log(`Error in startStrategyReceiveYieldinAUSD: `,er));
	}



	const startStrategyReceiveYieldinACA = () => {
		// startStrategyReceiveAUSD()
		// .then((res) => {
		// 	console.log(`We have just called startStrategyReceiveYieldinAUSD res: `,res);
		// })
		// .catch((er) => console.log(`Error in startStrategyReceiveYieldinAUSD: `,er));
	}


	// useEffect(() => {
	// 	const updateData = async () => {

	// 		if (blockHeader)
	// 		{
	// 			const mod5 = Number(blockHeader.number) % 5 ;
	// 			// console.log(`DEX BLOCKHEADER#: ${blockHeader.number}  mod5:${mod5}`);
	// 			if (mod5===0)
	// 			{
	// 				const stakeDOTinfo = await getBasicInfo();
	// 				if (stakeDOTinfo)
	// 				{
	// 					const {ntt54_StakeDOT_admin, treasuryBalances, REWARD_PER_BLOCK, epochNumber, dot_StakedBalance} = stakeDOTinfo;
	// 					// console.log(`ntt54_StakeDOT_admin: ${ntt54_StakeDOT_admin} treasuryBalances:${treasuryBalances} REWARD_PER_BLOCK:${REWARD_PER_BLOCK} epochNumber:${epochNumber}`)
	// 					setTreasuryBalances(treasuryBalances); setRewardPerBlock(REWARD_PER_BLOCK); setStakeEpochNumber(epochNumber); setDotStakedBalance(dot_StakedBalance)
	// 				}
	
	// 			}
	// 		}

	// 	}
	// 	updateData();

	// }, [blockHeader]);


	return(
		<>
				<div className="col-xl-12">
					<div className="row"> 
					 
						<div className="col-xl-3"></div>
						<div className="col-xl-6 col-xxl-12">
							<br/>
							<Card style={{backgroundColor:"#0c0c0c", marginBottom:"0px"}}>
								<Card.Body>
								<div className="custom-tab-1" >




								<div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
            	<div className="card mb-0" style={{color:"#9E38FF", backgroundColor:"#0c0c0c"}}>
              		<div className="card-body px-4 py-0">
					  	<div className="row">
							<div className="col-xl-6 col-lg-12 col-xxl-12 p-0 m-0"style={{backgroundColor:""}}>
								<Card className="mt-1 align-items-center pt-2 pt-0"style={{backgroundColor:"#0c0c0c"}}>
								
								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head"style={{backgroundColor:""}}>
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {fundAmount} placeholder="Amount To Finance Treasury" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => { 
															setFundAmount(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px",color:"white"}}  onClick = { () =>   
											approveAndFinanceTresury() 
											}>Approve & Finance Treasury</button> 
									</Link>
								</div>

								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head"style={{backgroundColor:""}}>
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {feesForStaker} placeholder="Amount To Finance Treasury" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => { 
															setFeesForStaker(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px",color:"white"}}  onClick = { () =>   
											AprooveAndPaysFeeStaker() 
											}>Approve & Pay Treasury Fees</button> 
									</Link>
								</div>

								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {withdrawAmount} placeholder="Withdraw Amount" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => { 
															setWithdrawAmount(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px",color:"white"}}  onClick = { () =>   
											withdrawFundsFromTreasury() 
											}>Withdraw Funds From Treasury</button> 
									</Link>
								</div>


								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {newRewardPerBlock} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => { 
															setNewRewardPerBlock(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px", color:"white"}}  onClick = { () => updateRewardPerEpock() }>Update Reward Per Epoch</button> 
									</Link>
								</div>

								<div className="form-head mb-sm-3 mb-3 d-flex align-items-center flex-wrap mt-3 text-head">
									<Link to={"#"} className="btn btn-outline-primary me-3 mb-2 rounded">
										<input type="text" value = {feesForStrategyAUSD} placeholder="New Reward Per Epoch" className="form-control" style={{color:"white", width:"200px"}} onChange={(event) => {  
															setFeesForStrategyAUSD(event.target.value);
														}
														} />
									</Link>
									<Link to={"#"} className="btn btn-primary me-3 mb-2 py-2 px-3 rounded">
										<button className="btn-primary fs-14" style={{border: "none", width:"140px",color:"white"}}  onClick = { () =>  
											AprooveAndPaysFeeStrategyAUSD() 
											}>Approve & Pay Strategy AUSD Fees</button> 
									</Link>
								</div>
								</Card>

							</div>
							<div className="col-xl-6 col-lg-12 col-xxl-12 p-0 m-0"style={{backgroundColor:""}}>
							<div className="row">

							<Col xl="2"></Col>
							<Col xl="8">
								<Card className="mt-5"style={{backgroundColor:"#0c0c0c"}}>
									<Card.Header className=" d-block text-center pb-2">
										<Card.Title>Strategy Control</Card.Title>
											<Card.Text className="mb-0 subtitle">
												Start and Stop Strategies
											</Card.Text>
									</Card.Header>
									<Card.Body className="pb-2">
										<ButtonGroup className="mb-4 me-2">
											<Button variant="warning" onClick = { () => startTheStakingContract() }>Start</Button>
											<Button variant="info disabled">Staking Contract</Button>
											<Button variant="warning" onClick = { () => stopTheStakingContract() }>Stop</Button>
										</ButtonGroup>

										<ButtonGroup className="mb-4 me-2">
											<Button variant="warning" onClick = { () => startStrategyReceiveYieldinAUSD() }>Start</Button>
											<Button variant="info disabled">Strategy 1</Button>
											<Button variant="warning" onClick = { () => stopStrategyReceiveYieldinAUSD() }>Stop</Button>
										</ButtonGroup>
										<ButtonGroup className="mb-4 me-2">
											<Button variant="warning" onClick = { () => startStrategyReceiveYieldinDOT() }>Start</Button>
											<Button variant="info disabled">Strategy 2</Button>
											<Button variant="warning">Stop</Button>
										</ButtonGroup>
										<ButtonGroup className="mb-4 me-2">
											<Button variant="warning" onClick = { () => startStrategyReceiveYieldinACA() }>Start</Button>
											<Button variant="info disabled">Strategy 3</Button>
											<Button variant="warning">Stop</Button>
										</ButtonGroup>


									</Card.Body>
								</Card>
							</Col>
							
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

						<div className="row">
							<div className="col-xl-12 col-xxl-8">

								<div className="card mb-0"style={{backgroundColor:"#202020"}}>
									<div className="card-header border-0 pt-3 pb-0 align-items-center">
										<h3 className="mb-0 text-center mx-auto">BALANCES </h3>
										{/* <h4 className="mb-0 fs-20 text-black">Balances ${totalPortfolioValue?totalPortfolioValue:0}</h4> */}

									</div>

				<div className="card-body mb-0 pt-0">
                  <div className="table-responsive recentOrderTable">
                    <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center"}}>
							{/* <th scope="col"style={{color:"#6e757c"}}>ACA</th> */}
							{/* <th scope="col"style={{color:"#6e757c"}}>DOT</th> */}
							<th scope="col"style={{color:"#6e757c"}}>FEES ACA<br />BALANCES </th>                         
							<th scope="col"style={{color:"#6e757c"}}>TREASURY<br />POOL AUSD</th>
							<th scope="col"style={{color:"#6e757c"}}>DOT STAKED<br />BALANCE</th>
							<th scope="col"style={{color:"#6e757c"}}>REWARDS<br />PER BLOCK</th>
							<th scope="col"style={{color:"#6e757c"}}>EPOCH<br />NUMBER</th>
							 <th scope="col"style={{color:"#6e757c"}}>CONTRACT<br />STATE</th>
							{/* <th scope="col"style={{color:"#6e757c"}}>STAKED<br />BALANCES</th> */}

                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          {/* <td>2</td> */}
                          <td>{stakeContractACABalance}</td>
                          <td>{treasuryBalances}</td>
                          <td>{dotStakedBalance}</td>
                          <td>{rewardPerBlock}</td>
                          <td>{stakeEpochNumber}</td>
						  <td>{stakeContractState? "Active":"Stopped"}</td>     
                          {/* <td>12.54</td> */}
						  {/* <td>12.54</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
				</div>


				</div>
			</div>
		</div>	

								</div>
								</Card.Body>
							</Card>
						</div>
					</div>
				</div>
		</>
	)
}
export default Portofolio; 