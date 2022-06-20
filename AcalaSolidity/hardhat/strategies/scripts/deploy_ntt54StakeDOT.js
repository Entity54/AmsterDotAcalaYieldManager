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
