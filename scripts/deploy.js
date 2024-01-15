const { ethers, artifacts } = require("hardhat");
const fs = require("fs");

async function deployContract() {
  try {
    // get the signer that we will use to deploy
    //const [deployer] = await ethers.getSigners();

    const SendToken = await ethers.getContractFactory("SendToken");
    const sendToken = await SendToken.deploy();

    await sendToken.deployed();

    const artifact = await artifacts.readArtifact("SendToken");
    const bytecode = artifact.deployedBytecode;

    // Pull the address and ABI out while you deploy
    const data = {
      contractName: sendToken.contractName,
      abi: JSON.parse(sendToken.interface.format("json")),
      bytecode: bytecode,
    };

    // Save ABI and Bytecode to separate files
    fs.writeFileSync(
      "./src/contractFiles/contractABI.json",
      JSON.stringify(data.abi, null, 2)
    );

    // Save Bytecode to a file
    fs.writeFileSync(
      "./src/contractFiles/contractBytecode.js",
      `export const bytecode = "${data.bytecode}";
      export default bytecode;`
    );

    console.log("Successfully deployed SendToken to:", sendToken.address);
  } catch (error) {
    console.error("Error deploying the contract:", error);
  }
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
