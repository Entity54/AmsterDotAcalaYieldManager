import React,{useState,useEffect} from 'react';
 
import pha100 from '../../../../icons/crypto/pha100.png';
import bsx100 from '../../../../icons/crypto/bsx100.png';
import kar100 from '../../../../icons/crypto/kar100.png';


import { 
  depositToTreasuryStakingContract, updateTreasuryRewardPerEpoch, withdrawFromTreasury, getSmartContractFeesBalances, 
  depositToStrategy_AUSD, depositToStrategy_DOT, depositToStrategy_ACA,
} from '../../../../ntt54_accounts.js';         


const UI2 = ({
  currentAccount, 
  // getAllBalanceForAccount, 
  acaBalance, ausdBalance, dotBalance, str1Balance, str2Balance, str3Balance, amountToStake,
  stg1AcaBalance, stg2AcaBalance, stg3AcaBalance, stg1DOTBalance, stg2DOTBalance, stg3DOTBalance,
  // resetTargetAccount, originChainSelected, destinationChainSelected, selectedTokenfunction, selectedDestinationChainfunction, selectedOriginChainfunction, resetState, 
}) => {
   
	const [strategy, setStrategy] = useState("");
	const [frequency, setFrequency] = useState("");

	// const [radio1state, setRadio1state] = useState(true);
	// const [radio2state, setRadio2state] = useState(false);
	// const [radio3state, setRadio3state] = useState(false);
  

  const strategyPicker = (strategyName) => {
    if (strategyName==="ACA")
    {
      console.log(`User picked to receive ACA`);
      setStrategy(strategyName);
      // setRadio1state(true); setRadio2state(false);  setRadio3state(false);
    }
    else if (strategyName==="DOT")
    {
      console.log(`User picked to receive DOT`);
      setStrategy(strategyName);
      // setRadio1state(false); setRadio2state(true);  setRadio3state(false);


    }
    else if (strategyName==="AUSD")
    {
      console.log(`User picked to receive AUSD`);
      setStrategy(strategyName);
      // setRadio1state(false); setRadio2state(false);  setRadio3state(true);

    }

  }

  const frequencyPicker = (numBlocks) => {
    console.log(`User picked frequency: ${numBlocks}`);
    setFrequency(numBlocks);
  }


  const stake = async () => {
    console.log(`User submits to the strategy: ${strategy} with frequency:${frequency} to stake: ${amountToStake}`);

    if (amountToStake!=="" && strategy!=="" && frequency!=="")
		{
      if (strategy==="AUSD")
      {
        console.log(`Deposit DOT to strategy: AUSD`);

        depositToStrategy_AUSD(amountToStake)
        .then((res) => {
          console.log(`We have just called stake depositToStrategy_AUSD amountToStake: ${amountToStake} res: `,res);
        })
        .catch((er) => console.log(`Error in depositToStrategy_AUSD: `,er));

      }
      else if (strategy==="DOT")
      {
        console.log(`Deposit DOT to strategy: DOT`);

        depositToStrategy_DOT(amountToStake)
        .then((res) => {
          console.log(`We have just called stake depositToStrategy_DOT amountToStake: ${amountToStake} res: `,res);
        })
        .catch((er) => console.log(`Error in depositToStrategy_DOT: `,er));

      }
      else if (strategy==="ACA")
      {
        console.log(`Deposit DOT to strategy: ACA`);

        depositToStrategy_ACA(amountToStake)
        .then((res) => {
          console.log(`We have just called stake depositToStrategy_ACA amountToStake: ${amountToStake} res: `,res);
        })
        .catch((er) => console.log(`Error in depositToStrategy_ACA: `,er));

      }
      
		}

  }



  // useEffect(() => {
	// 	if (currentAccount) getAllBalanceForAccount();
	// }, [currentAccount]);


	return(
		<>
      {/* <div style={{marginTop:"20px"}}>
        <div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
          <div className="row p-0 m-0">
            <div className="col-xl-12 p-0 m-0">
              <div className="card p-0 m-0"style={{backgroundColor:"#0c0c0c"}}>
                <div className="card-body mb-4">
                  <div className="table-responsive recentOrderTable">
                    <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center", }}>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>ACA<br />DOT</th>
                          <th scope="col"style={{color:"#6e757c"}}>ACA</th>
                          <th scope="col"style={{color:"#6e757c"}}>DOT</th>
                          <th scope="col"style={{color:"#6e757c"}}>AUSD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>12.54</td>
                          <td>12.54</td>
                          <td>12.54</td>
                          <td>12.54</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-0" style={{marginTop:"130px",backgroundColor:"#0c0c0c",color:"#9E38FF"}}>
          <div className="card-body mt-0 p-0">
            <div className="basic-form">
              <form className="form-wrapper mb-0">
                <div className="form-group mb-0">
                  <div className="row" style={{ marginTop:"10px"}}>
                    <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3" style={{height:"50px", padding:"2px", cursor:"pointer"}}></div>
                    <div className="col-xl-10 col-xxl-4 col-lg-6 col-sm-6 px-3">
                      <div className="row">
                        <h3 className="pt-3 mb-2"><span style={{color:"#6e757c"}}>Choose An Option:</span></h3>
                      </div>
                      <div className="row" style={{ marginTop:"10px"}}>
                        <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-11 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="row">
                            <div className="card-body p-0">
                              <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="form-group text-info mb-0 fs-18 font-w500">
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" /> ReInvest The Yield Into The ACA-DOT Pool
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" /> Receive The Yield In ACA
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" /> Receive The Yield In DOT
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" /> Receive The Yield In AUSD
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          <h3 className="text-white pt-3 mb-2"><span style={{color:"#6e757c"}}>ReInvestment Frequency:</span></h3>
                      </div>
                      <div className="row" style={{ marginTop:"10px"}}>
                        <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-11 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="row">
                            <div className="card-body p-0">
                              <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="form-group mb-4 fs-18 text-info font-w500">
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio" /> 10 Blocks
                                    </label>
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio" /> 20 Blocks
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}}>ADD LIQUIDITY</button> 
            <button type="button" className="btn btn-outline-primary btn-lg btn-block">ADD LIQUIDITY & STAKE</button> 
            <button type="button" className="btn btn-outline-primary btn-lg btn-block">ADD LIQUIDITY, STAKE & MANAGE YIELD</button> 
          </div>
        </div>
      </div> */}

    {/* ----------------INTENDED FRONT END FINISH------------------- */}

    {/* ----------------ADJUSTED FRONT END START------------------- */}

    <div style={{marginTop:"20px"}}>
        <div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
          <div className="row p-0 m-0">
            <div className="col-xl-12 p-0 m-0">
              <div className="card p-0 m-0"style={{backgroundColor:"#0c0c0c"}}>
                <div className="card-body mb-4">
                  <div className="table-responsive recentOrderTable">
                  <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center", }}>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR<br />1</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR<br />2</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR<br />3</th>
                          <th scope="col"style={{backgroundColor:"",color:"#6e757c"}}>ACA</th>
                          <th scope="col"style={{color:"#6e757c"}}>DOT</th>
                          <th scope="col"style={{color:"#6e757c"}}>AUSD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>{str1Balance}</td>
                          <td>{str2Balance}</td>
                          <td>{str3Balance}</td>
                          {/* <td>12.54</td> */}
                          <td>{acaBalance}</td>
                          <td>{dotBalance}</td>
                          <td>{ausdBalance}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center", }}>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR1<br />ACA</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR2<br />ACA</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR3<br />ACA</th>
                          <th scope="col"style={{backgroundColor:"",color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>{stg1AcaBalance}</td>
                          <td>{stg2AcaBalance}</td>
                          <td>{stg3AcaBalance}</td>
                          {/* <td>12.54</td> */}
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table verticle-middle table-hover">
                      <thead>
                        <tr style={{textAlign:"center", }}>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR1<br />DOT</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR2<br />DOT</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR3<br />DOT</th>
                          <th scope="col"style={{backgroundColor:"",color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>{stg1DOTBalance}</td>
                          <td>{stg2DOTBalance}</td>
                          <td>{stg3DOTBalance}</td>
                          {/* <td>12.54</td> */}
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-0" style={{marginTop:"0px",backgroundColor:"#0c0c0c",color:"#9E38FF"}}>
          <div className="card-body mt-0 p-0">
            <div className="basic-form">
              <form className="form-wrapper mb-0">
                <div className="form-group mb-0">
                  <div className="row" style={{ marginTop:"10px"}}>
                    <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3" style={{height:"50px", padding:"2px", cursor:"pointer"}}></div>
                    <div className="col-xl-10 col-xxl-4 col-lg-6 col-sm-6 px-3">
                      <div className="row">
                        <h3 className="pt-3 mb-2"><span style={{color:"#6e757c"}}>Choose An Option:</span></h3>
                      </div>
                      <div className="row" style={{ marginTop:"10px"}}>
                        <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-11 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="row">
                            <div className="card-body p-0">
                              <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="form-group text-info mb-0 fs-18 font-w500">
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio"  onClick = { () => strategyPicker("ACA") } /> Receive The Yield In ACA &nbsp;&nbsp;&nbsp; (STR 1)
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio"  onClick = { () => strategyPicker("DOT") } /> Receive The Yield In DOT &nbsp;&nbsp;&nbsp; (STR 2)
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" onClick = { () => strategyPicker("AUSD") } /> Receive The Yield In AUSD &nbsp; (STR 3)
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          <h3 className="text-white pt-3 mb-2"><span style={{color:"#6e757c"}}>ReInvestment Frequency:</span></h3>
                      </div>
                      <div className="row" style={{ marginTop:"10px"}}>
                        <div className="col-xl-1 col-xxl-4 col-lg-6 col-sm-6 px-3"></div>
                        <div className="col-xl-11 col-xxl-4 col-lg-6 col-sm-6 px-3">
                          <div className="row">
                            <div className="card-body p-0">
                              <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <div className="form-group mb-4 fs-18 text-info font-w500">
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio"  onClick = { () => frequencyPicker(20) } /> 20 Blocks
                                    </label>
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio" onClick = { () => frequencyPicker(40) } /> 40 Blocks
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-outline-primary btn-lg btn-block"style={{backgroundColor:"#0c0c0c"}} onClick = { () => stake() } >ADD LIQUIDITY</button> 
            {/* <button type="button" className="btn btn-outline-primary btn-lg btn-block">ADD LIQUIDITY & STAKE</button> 
            <button type="button" className="btn btn-outline-primary btn-lg btn-block">ADD LIQUIDITY, STAKE & MANAGE YIELD</button>  */}
          </div>
        </div>
      </div>

    {/* ----------------ADJUSTED FRONT END START------------------- */}
		</>
	)
}
export default UI2;