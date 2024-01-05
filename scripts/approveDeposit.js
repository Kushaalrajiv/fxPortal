const { ethers } = require("hardhat");
const { FXRootContractAbi } = require('../artifacts/FXRootContractAbi.js');
const ABI = require('../artifacts/contracts/Antarctica.sol/Antarctica.json');
require('dotenv').config();

// Transferring the asssets to FxChain 
async function main() {
 
  const networkAddress = 'https://ethereum-goerli.publicnode.com';
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);

  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const AntarcticaNFT = await ethers.getContractFactory("Antarctica");
  const nft = await AntarcticaNFT.attach('0x81dd81A68E5c7C3F7b7a4a0fB43e04F274C9BF53');

  // Get FXRoot contract instance
  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log('Approval confirmed');

  const tokenIds = [0, 1, 2, 3, 4]; 

  for (let i = 0; i < tokenIds.length; i++) {
    const depositTx = await fxRoot.connect(signer).deposit(
      nft.address,
      wallet.address, 
      tokenIds[i],
      '0x6566'
    );

    await depositTx.wait();
  }

  console.log("Approved and deposited");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
