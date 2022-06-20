const { txParams } = require("../utils/transactionHelper");

async function main() {
  const ethParams = await txParams();

  const [deployer] = await ethers.getSigners();

  const ntt54StgyAUSDincome = await ethers.getContractFactory("ntt54StgyAUSDincome");
  const instance = await ntt54StgyAUSDincome.deploy( "0xA1720056337E496F2e34837bF745D6e89ac427BA", {
    gasPrice: ethParams.txGasPrice,
    gasLimit: ethParams.txGasLimit,
  });

  console.log("ntt54StgyAUSDincome address:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 
 
 



// ****** SUCCESFUL ******  
// ntt54StgyAUSDincome address: 0xf7C49b4Cf71f8316aE58c4bD014C985C5535D2c1
// ntt54StgyAUSDincome address: 0xC3056cEFB10b1F1f01B0f4EB50E42872d48a8dE2
// ntt54StgyAUSDincome address: 0x96E400C1134143af503881874FfDA6ad66AF0449
// ntt54StgyAUSDincome address: 0xA656Cbb45135D1C760Cb2DCf1eC57B42a560B2b3
// ntt54StgyAUSDincome address: 0xD8190A936d0bA8cBAD9b279B0A3BEf1AB466DdA2
