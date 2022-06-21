import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";
/// Css 
import "./index.css";
import "./chart.css";
import "./step.css";
/// Layout
import Header from "./layouts/nav/Header";
import NAV_NavHade from "./layouts/nav/NavHader";
import NAV_SideBar from "./layouts/nav/SideBar";
import Footer from "./layouts/Footer";
import { ThemeContext } from "../context/ThemeContext";  
/// Dashboard
import DEX from "./components/Dashboard/DEX";
import Portofolio from "./components/Dashboard/Portofolio";


const Markup = ( { 
  currentAccount, provider, wallet, setupSpecs, portfolio, oracleData, blockHeader, evm_api_state, accountList, selectedAccountName,
  treasuryBalances, dotStakedBalance, rewardPerBlock, stakeEpochNumber,  stakeContractState, stakeContractACABalance,
  acaBalance, ausdBalance,  dotBalance, str1Balance, str2Balance, str3Balance,
  stg1AusdBalance,  stg2AusdBalance,  stg3AusdBalance,  
  stg1DOTBalance,  stg2DOTBalance, stg3DOTBalance, stg1ACABalance, stg2ACABalance, stg3ACABalance,
  getAllBalanceForAccount,
}) => {

  const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div id={`${!pagePath ? "main-wrapper" : ""}`} className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""}`}>

        {!pagePath && <Header setupSpecs={setupSpecs} evm_api_state={evm_api_state} blockHeader={blockHeader} accountList={accountList} selectedAccountName={selectedAccountName}  />}
        {!pagePath && <NAV_NavHade blockHeader={blockHeader} />}
        {!pagePath && <NAV_SideBar />}

        <div className={`${!pagePath ? "content-body" : ""}`} style={{marginBottom:"-450px"}}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              <Route exact path='/'> 
                  <DEX  currentAccount={currentAccount} setupSpecs={setupSpecs} portfolio={portfolio} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} 
                        acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} 
                        str1Balance={str1Balance}  str2Balance={str2Balance}  str3Balance={str3Balance}  
                        stg1AusdBalance={stg1AusdBalance}  stg2AusdBalance={stg2AusdBalance}  stg3AusdBalance={stg3AusdBalance} 
                        stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance}
                        stg1ACABalance={stg1ACABalance} stg2ACABalance={stg2ACABalance} stg3ACABalance={stg3ACABalance}
                        getAllBalanceForAccount={getAllBalanceForAccount}
                  /> 
              </Route>

              <Route exact path='/dex'> 
                  <DEX  currentAccount={currentAccount} setupSpecs={setupSpecs} portfolio={portfolio} oracleData={oracleData} blockHeader={blockHeader} accountList={accountList} 
                        acaBalance={acaBalance}  ausdBalance={ausdBalance}  dotBalance={dotBalance} 
                        str1Balance={str1Balance}  str2Balance={str2Balance}  str3Balance={str3Balance}  
                        stg1AusdBalance={stg1AusdBalance}  stg2AusdBalance={stg2AusdBalance}  stg3AusdBalance={stg3AusdBalance}  
                        stg1DOTBalance={stg1DOTBalance}  stg2DOTBalance={stg2DOTBalance} stg3DOTBalance={stg3DOTBalance}
                        stg1ACABalance={stg1ACABalance} stg2ACABalance={stg2ACABalance} stg3ACABalance={stg3ACABalance}
                        getAllBalanceForAccount={getAllBalanceForAccount}
                  /> 
              </Route>

              <Route exact path='/portofolio'> 
                  <Portofolio 
                        currentAccount={currentAccount} provider={provider} wallet={wallet} 
                        setupSpecs={setupSpecs} portfolio={portfolio} blockHeader={blockHeader} accountList={accountList}
                        treasuryBalances={treasuryBalances} dotStakedBalance={dotStakedBalance} rewardPerBlock={rewardPerBlock} stakeEpochNumber={stakeEpochNumber}
                        stakeContractState={stakeContractState} stakeContractACABalance={stakeContractACABalance}
                        getAllBalanceForAccount={getAllBalanceForAccount}
                  /> 
              </Route>

            </Switch> 
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
    </>
  );
};

export default Markup;
