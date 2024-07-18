const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/Alien.sol/Alien.json");
require("dotenv").config();


async function main() {
  const networkAddress = "https://ethereum-sepolia-rpc.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);
  const signer = wallet.connect(provider);

  const NFT = await ethers.getContractFactory("Alien", signer);
  const nft = NFT.attach("0xB83f211B77B6937d74511140DC580247aF36cAD7");
  const fxRootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";
  const fxRoot = new ethers.Contract(fxRootAddress, FXRootContractAbi, signer);

  const Tids = [0, 1, 2, 3, 4];
  const approveTx = await nft.setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Set Approval successfully called!");

  for (const tokenId of Tids) {
    const depositTx = await fxRoot.deposit(nft.address, wallet.address, tokenId, "0x6566");
    await depositTx.wait();
  }

  console.log("NFTs have been transferred!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
