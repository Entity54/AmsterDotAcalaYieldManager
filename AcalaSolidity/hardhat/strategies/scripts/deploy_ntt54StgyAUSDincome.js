const { txParams } = require("../utils/transactionHelper");

async function main() {
  const ethParams = await txParams();

  const [deployer] = await ethers.getSigners();

  const ntt54StgyAUSDincome = await ethers.getContractFactory("ntt54StgyAUSDincome");
  const instance = await ntt54StgyAUSDincome.deploy( "0xba1bEd9Cd1D186DD120761E4792c959132775363", {
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
// ntt54StgyAUSDincome address: 0x1F26483e0317260fE42dCE12150645036754F9ec
// ntt54StgyAUSDincome address: 0x6b2b9C7Ced8Ff02363C883F049E57625560C2e7C
// ntt54StgyAUSDincome address: 0xDDa68a65A17bb2fd845AC4954fcA4592C653A380
// ntt54StgyAUSDincome address: 0x58EAf40E78A5CD49579A7a4F1A6b890436B15206
// ntt54StgyAUSDincome address: 0xd7263F420891f6c2EA625410C8c1940A9976f668
// ntt54StgyAUSDincome address: 0x7Fb9f254801De7a1ecce1958DD50C862Ba956444
// ntt54StgyAUSDincome address: 0x31Fa3382279C1485B25EE4b758FE0b02C0912098

