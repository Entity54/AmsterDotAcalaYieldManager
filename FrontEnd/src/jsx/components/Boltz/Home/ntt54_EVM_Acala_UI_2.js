import React,{useState,useEffect} from 'react';
 
import { depositToStrategyForACA, depositToStrategyForDOT, depositToStrategyForAUSD, } from '../../../../ntt54_accounts.js';         


const UI2 = ({ currentAccount,
  acaBalance, ausdBalance, dotBalance, str1Balance, str2Balance, str3Balance, amountToStake,
  stg1AusdBalance,  stg2AusdBalance,  stg3AusdBalance,  
  stg1DOTBalance, stg2DOTBalance, stg3DOTBalance, stg1ACABalance, stg2ACABalance, stg3ACABalance,
  getAllBalanceForAccount,
}) => {
   
	const [strategy, setStrategy] = useState("ACA");
	const [frequency, setFrequency] = useState("10");


  const strategyPicker = (strategyName) => {
    if (strategyName==="ACA")
    {
      console.log(`User picked to receive ACA`);
      setStrategy(strategyName);
    }
    else if (strategyName==="DOT")
    {
      console.log(`User picked to receive DOT`);
      setStrategy(strategyName);
    }
    else if (strategyName==="AUSD")
    {
      console.log(`User picked to receive AUSD`);
      setStrategy(strategyName);
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
      if (strategy==="ACA")
      {
        console.log(`Deposit DOT to strategy and get ACA`);

        depositToStrategyForACA(amountToStake)
        .then(async (res) => {
          console.log(`We have just called stake depositToStrategyForACA amountToStake: ${amountToStake} res: `,res);
          console.log(`Now lets refresh the balances for currentAccount:${currentAccount}`);
          await getAllBalanceForAccount(currentAccount);
        })
        .catch((er) => console.log(`Error in depositToStrategyForACA: `,er));

      }
      else if (strategy==="DOT")
      {
        console.log(`Deposit DOT to strategy and get DOT`);

        depositToStrategyForDOT(amountToStake)
        .then(async (res) => {
          console.log(`We have just called stake depositToStrategyForDOT amountToStake: ${amountToStake} res: `,res);
          console.log(`Now lets refresh the balances for currentAccount:${currentAccount}`);
          await getAllBalanceForAccount(currentAccount);
        })
        .catch((er) => console.log(`Error in depositToStrategyForDOT: `,er));

      }
      else if (strategy==="AUSD")
      {
        console.log(`Deposit DOT to strategy and get AUSD`);

        depositToStrategyForAUSD(amountToStake)
        .then(async (res) => {
          console.log(`We have just called stake depositToStrategyForAUSD amountToStake: ${amountToStake} res: `,res);
          console.log(`Now lets refresh the balances for currentAccount:${currentAccount}`);
          await getAllBalanceForAccount(currentAccount);
        })
        .catch((er) => console.log(`Error in depositToStrategyForAUSD: `,er));

      }
      
		}

  }


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

    <div style={{marginTop:"0px"}}>

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
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR1<br />AUSD</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR2<br />AUSD</th>
                          <th scope="col"style={{paddingTop:"0px", paddingBottom:"0px",color:"#6e757c"}}>STR3<br />AUSD</th>
                          <th scope="col"style={{backgroundColor:"",color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                          <th scope="col"style={{color:"#6e757c"}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{textAlign:"center"}}>
                          <td>{stg1AusdBalance}</td>
                          <td>{stg2AusdBalance}</td>
                          <td>{stg3AusdBalance}</td>
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
                          <td>{stg1ACABalance}</td>
                          <td>{stg2ACABalance}</td>
                          <td>{stg3ACABalance}</td>
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

        <div className="card mb-0" style={{marginTop:"-10px",backgroundColor:"#0c0c0c",color:"#9E38FF"}}>
          <div className="card-body mt-0 p-0">
            <div className="basic-form">
              {/* <form className="form-wrapper mb-0"> */}
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
                                        <input type="radio" name="optradio" defaultChecked onClick = { () => strategyPicker("ACA") } /> Receive The Yield In ACA &nbsp;&nbsp;&nbsp; (STR 1)
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input type="radio" name="optradio" onClick = { () => strategyPicker("DOT") } /> Receive The Yield In DOT &nbsp;&nbsp;&nbsp; (STR 2)
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
                                      <input type="radio" name="optradio"  onClick = { () => frequencyPicker(5) } /> 5 Blocks
                                    </label>
                                    <label className="radio-inline me-3">
                                      <input type="radio" name="optradio" onClick = { () => frequencyPicker(10) } /> 10 Blocks
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
              {/* </form> */}
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-xl-1"></div>
          <div className="col-xl-10"  style={{marginTop:"10px"}}>
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