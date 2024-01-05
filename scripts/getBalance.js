const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Antarctica.sol/Antarctica.json");

const tokenAddress = "0x18313b81B9D938FFB364139bC035c89D57728552";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xA89E43a9884F20b000F91FC10853b3A040B72c0e"; 

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
