const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  const privateKey = process.env.PRIVATE_KEY;

  const networkAddress = "https://ethereum-goerli.publicnode.com";

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x81dd81A68E5c7C3F7b7a4a0fB43e04F274C9BF53";

  const GWarming = await ethers.getContractFactory("Antarctica", signer);
  const contract = await GWarming.attach(contractAddress);

  await contract.mint(5);

  console.log("Minted 5 NFTs");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });