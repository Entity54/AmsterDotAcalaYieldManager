import React,{useState,useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
 
import acadot100 from '../../../../icons/crypto/acadot100.png';
import stakeddot100 from '../../../../icons/crypto/stakeddot100.png';


const UI1 = ({ dotBalance, set_AmountToStake, }) => {
	 
  const [amountOfDot , setAmountOfDot]  = useState("");  


	return(
		<>
   {/* ----------------INTENDED FRONT END START------------------- */}

    {/* <div style={{color:"#9E38FF"}}>
        <div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
            <div className="card mb-0" style={{color:"#9E38FF", backgroundColor:"#0c0c0c"}}>
              <div className="card-body px-4 py-0">
									<Dropdown className="dropdown custom-dropdown d-block tbl-orders">
										<Dropdown.Toggle variant="" as="div" className="btn  d-flex align-items-center border-0 order-bg rounded  i-false" style={{backgroundColor:"black"}}>	
                      <img src={acadot100} style={{width: "80px", height: "50px"}}></img>
											<div className="text-start ms-3">
												<span className="d-block fs-16 text-black">LP ACA-DOT</span>
											</div>
											<i className="fa fa-angle-down scale5 ms-auto"></i>
										</Dropdown.Toggle>	
										<Dropdown.Menu className="dropdown-menu dropdown-menu-right" >
											<Dropdown.Item>STAKED DOT </Dropdown.Item>
										</Dropdown.Menu>			
									</Dropdown>
							</div>
            </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-xxl-12 p-0">
          <div className="row mt-0">
            <div className="col-xl-9 col-lg-12 col-xxl-12">
              <div className="card-body px-4 py-2">
                <div className="basic-form">
                  <form className="form-wrapper">
                      <div className="form-group">
                        <div className="" style={{float:"right",color:"#6e757c"}}>
                          <p>
                            Balance: <span className="item text-white">23.2455</span>
                          </p>
                        </div>
                        <div className="input-group input-group-lg">
                          <div className="input-group-prepend">
                            <span className="input-group-text"style={{backgroundColor:"#060e29"}}>ACA</span>
                          </div>
                          <input type="number" className="form-control text-white" placeholder="0.0"style={{backgroundColor:"#060e29"}} />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="" style={{float:"right",color:"#6e757c"}}>
                          <p>
                            Balance: <span className="item text-white">23.2455</span>
                          </p>
                        </div>
                        <div className="input-group input-group-lg">
                          <div className="input-group-prepend">
                            <span className="input-group-text "style={{backgroundColor:"#060e29"}}>DOT</span>
                          </div>
                          <input type="number" className="form-control" placeholder="0.0" style={{backgroundColor:"#060e29"}}/>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-12 col-xxl-12 p-0 m-0">
              <button type="button" className="btn btn-outline-primary btn-lg btn-block px-1 py-1"style={{marginTop:"120px"}}>MAX</button> 
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-sm-12">
          <div className="card mb-0 mt-4"style={{backgroundColor:"#0c0c0c"}}>
            <div className="card-header border-0 pb-0 pt-2 mx-auto">
              <h2 className="card-title">0 ACA + 0 DOT</h2>
            </div>
            <div className="card-body pb-0 pt-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong style={{color:"#6e757c"}}>Minimum LP Token Received</strong>
                  <span className="mb-0 text-white">1.23 ACA-DOT</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong style={{color:"#6e757c"}}>Exchange Rate</strong>
                  <span className="mb-0 text-white">1 DOT ~ 0.2042 ACA</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong style={{color:"#6e757c"}}>Current Pool Size</strong>
                  <span className="mb-0 text-white">137,357.7965 ACA + 672,510.3485 DOT</span>
                </li>
                <li className="list-group-item d-flex px-0 justify-content-between">
                  <strong style={{color:"#6e757c"}}>Flexible Fee</strong>
                  <span className="mb-0 text-white">0.0129 ACA</span>
                </li>
              </ul>
            </div>

            <div className="card-footer pt-0 pb-0 text-center">
              <div className="row">
                <div className="col-6 pt-3 pb-3 border-right">
                  <h3 className="mb-3"><span style={{color:"#6e757c"}}>STAKE LP TOKENS</span></h3>
                  <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="col-6 pt-3 pb-3">
                  <h3 className="mb-3 text-primary"><span style={{color:"#6e757c"}}>MANAGE YIELD</span></h3>
                  <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

    {/* ----------------INTENDED FRONT END FINISH------------------- */}

    {/* ----------------ADJUSTED FRONT END START------------------- */}

    <div style={{color:"#9E38FF"}}>
    <div className="col-xl-12 col-lg-12 col-xxl-12 p-0 m-0">
        <div className="card mb-0" style={{color:"#9E38FF", backgroundColor:"#0c0c0c"}}>
          <div className="card-body px-4 py-0">
              <Dropdown className="dropdown custom-dropdown d-block tbl-orders">
                <Dropdown.Toggle variant="" as="div" className="btn  d-flex align-items-center border-0 order-bg rounded  i-false" style={{backgroundColor:"black"}}>	
                  <img src={stakeddot100} style={{width: "50px", height: "50px"}}></img>
                  <div className="text-start ms-3">
                    <span className="d-block fs-16 text-black">STAKED DOT</span>
                  </div>
                  <i className="fa fa-angle-down scale5 ms-auto"></i>
                </Dropdown.Toggle>	
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right" >
                  <Dropdown.Item>LP ACA-DOT </Dropdown.Item>
                </Dropdown.Menu>			
              </Dropdown>
          </div>
        </div>
    </div>

    <div className="col-xl-12 col-lg-12 col-xxl-12 p-0">
      <div className="row mt-0">
        <div className="col-xl-9 col-lg-12 col-xxl-12">
          <div className="card-body px-4 py-2">
            <div className="basic-form">
              <form className="form-wrapper">
                  <div className="form-group">
                    <div className="" style={{float:"right",color:"#6e757c"}}>
                      <p>
                        Balance: <span className="item text-white">{dotBalance}</span>
                      </p>
                    </div>
                    <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                        <span className="input-group-text"style={{backgroundColor:"#060e29"}}>DOT</span>
                      </div>
                      <input type="number" value = {amountOfDot} className="form-control text-white" placeholder="0.0"style={{backgroundColor:"#060e29"}} onChange={(event) => {
                          setAmountOfDot(event.target.value) ;
                          set_AmountToStake(event.target.value);
                         }
                      }/>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-12 col-xxl-12 p-0 m-0">
          <button type="button" className="btn btn-outline-primary btn-lg btn-block px-1 py-1"style={{marginTop:"60px"}}  onClick = { () =>  { 
              setAmountOfDot(dotBalance); 
              set_AmountToStake(dotBalance);
            } 
          } >MAX</button> 
        </div>
      </div>
    </div>

    <div className="col-xl-12 col-lg-12 col-sm-12">
      <div className="card mb-0 mt-4"style={{backgroundColor:"#0c0c0c"}}>
        <div className="card-header border-0 pb-0 pt-2 mx-auto">
          <h2 className="card-title">MORE INFORMATION</h2>
        </div>
        <div className="card-body pb-0 pt-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex px-0 justify-content-between">
              <strong style={{color:"#6e757c"}}>Minimum STR Tokens Received</strong>
              <span className="mb-0 text-white">1.23 STR2</span>
            </li>
            <li className="list-group-item d-flex px-0 justify-content-between">
              <strong style={{color:"#6e757c"}}>Exchange Rate</strong>
              <span className="mb-0 text-white">1 DOT = 1 STR2</span>
            </li>
            <li className="list-group-item d-flex px-0 justify-content-between">
              <strong style={{color:"#6e757c"}}>Current Pool Size</strong>
              <span className="mb-0 text-white">137,357.7965 DOT + 672,510.3485 STR2</span>
            </li>
          </ul>
        </div>

        <div className="card-footer pt-0 pb-0 mb-0 text-center">
          <div className="row">
            <div className="col-12 pt-3">
              <h3 className="mb-3 text-primary"><span style={{color:"#6e757c"}}>MANAGE YIELD</span></h3>
              <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    {/* ----------------ADJUSTED FRONT END FINISH------------------- */}
		</>
	)
}
export default UI1;