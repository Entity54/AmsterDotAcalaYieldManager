const { txParams } = require("../utils/transactionHelper");

async function main() {
  const ethParams = await txParams();

  const [deployer] = await ethers.getSigners();

  const ntt54StakeDOT = await ethers.getContractFactory("ntt54StakeDOT");
  const instance = await ntt54StakeDOT.deploy({
    gasPrice: ethParams.txGasPrice,
    gasLimit: ethParams.txGasLimit,
  });

  console.log("ntt54StakeDOT address:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 
 
 



// ****** SUCCESFUL ******  
// ntt54StakeDOT address: 0x466cE828C7C1905C9919F41a0FCABCd319Ab1562
// ntt54StakeDOT address: 0x1Aa8Fa4A434E00d128448E5575697629F5DBBBc1
// ntt54StakeDOT address: 0x8e20c59D3d5aED1aae36ed59959389bE2f93205D
// ntt54StakeDOT address: 0xA1720056337E496F2e34837bF745D6e89ac427BA
// ntt54StakeDOT address: 0x887DE4979f2ce2205c2A00BDC241f41669ab4b88
// ntt54StakeDOT address: 0xfb03F8528F97bD9e1fc5DA38041Cf2EE23448C09
// ntt54StakeDOT address: 0xfee21576d59F2189Cc011136509c30b053363E59
// ntt54StakeDOT address: 0x81b29c97094086CB9bb14ca6ded4Ad46dd8a916b
// ntt54StakeDOT address: 0x58EAf40E78A5CD49579A7a4F1A6b890436B15206
// ntt54StakeDOT address: 0xa8271d41f5F5146d9484268DbdE9282A70C26CE2
// ntt54StakeDOT address: 0xba1bEd9Cd1D186DD120761E4792c959132775363
