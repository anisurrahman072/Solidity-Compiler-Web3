const Web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Getting the output of our compiled Solidity Contract

const { contracts } = require("./compile");

// ######## WEB3 START ##########
// ######## WEB3 START ##########
// ######## WEB3 START ##########

async function main() {
  // Configuring the connection to the Polygon mumbai node
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.ALCHEMY_API_KEY)
  );

  // Check account balance first
  let balance = await web3.eth.getBalance(
    process.env.TRANSACTION_SIGNER_PUBLIC_ADDESS
  ); //Will give value in.
  console.log("======> Balance: ", balance);

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.TRANSACTION_SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  // deploying our contract
  const result = await new web3.eth.Contract(
    contracts["MyContract.sol"]["MyContract"].abi,
    null,
    {
      transactionBlockTimeout: 200,
      transactionConfirmationBlocks: 1000,
      transactionPollingTimeout: 1000,
      blockHeaderTimeout: 100,
    }
  )
    .deploy({
      data: contracts["MyContract.sol"]["MyContract"].evm.bytecode.object,
    })
    .send({
      // gasPrice: 210000000000, // MAINNET
      // gas: 26000000, // MAINNET
      gas: "5000000", // Mumbai Testnet
      from: process.env.TRANSACTION_SIGNER_PUBLIC_ADDESS,
    });

  console.log("#### Contract deployed to", result.options.address);
  fs.writeFileSync(
    path.join(__dirname, "createdContractAddress.txt"),
    result.options.address
  );

  // Store ABI (Application Binary Interface) & Contract Bytecode
  fs.writeFileSync(
    path.join(__dirname, "abi.txt"),
    JSON.stringify(contracts["MyContract.sol"]["MyContract"].abi)
  );

  fs.writeFileSync(
    path.join(__dirname, "bytecode.txt"),
    contracts["MyContract.sol"]["MyContract"].evm.bytecode.object
  );
}

main();
