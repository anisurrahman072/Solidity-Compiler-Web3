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
    contracts[`${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`][
      process.env.CONTRACT_NAME_TO_DEPLOY
    ].abi,
    null,
    {
      transactionBlockTimeout: 200,
      transactionConfirmationBlocks: 1000,
      transactionPollingTimeout: 1000,
      blockHeaderTimeout: 100,
    }
  )
    .deploy({
      data: contracts[`${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`][
        process.env.CONTRACT_NAME_TO_DEPLOY
      ].evm.bytecode.object,
    })
    .send({
      gasPrice:
        process.env.BLOCK_CHAIN_ID == "137" ? 210000000000 : 21000000000,
      gas: process.env.BLOCK_CHAIN_ID == "137" ? 26000000 : 5000000,
      from: process.env.TRANSACTION_SIGNER_PUBLIC_ADDESS,
    });

  console.log("#### Contract deployed to", result.options.address);

  // ############## IF not Created Contract named Folder, then create Contract named Folder ##############
  // ############## IF not Created Contract named Folder, then create Contract named Folder ##############
  if (
    !fs.existsSync(
      path.join(
        __dirname,
        "uploadedContracts",
        process.env.CONTRACT_NAME_TO_DEPLOY
      )
    )
  ) {
    fs.mkdirSync(
      path.join(
        __dirname,
        "uploadedContracts",
        process.env.CONTRACT_NAME_TO_DEPLOY
      )
    );

    console.log("Folder Created Successfully.");
  }

  // ############################# Save deployed Contracts data #############################
  // ############################# Save deployed Contracts data #############################
  fs.readdir(
    path.join(
      __dirname,
      "uploadedContracts",
      process.env.CONTRACT_NAME_TO_DEPLOY
    ),
    (err, files) => {
      // ******************* Count how many Folders Exist before *******************
      let newContractFolderName = String(files.length);

      // ******************* Get DATE & TIME for folder name *******************
      let runningDateTime = new Date();
      let date = runningDateTime.toDateString("dd");
      let time = runningDateTime.toLocaleTimeString("en-US");
      newContractFolderName = newContractFolderName + " _ " + date + " " + time;

      // ******************* Create New Folder for by DATE + TIME *******************
      fs.mkdirSync(
        path.join(
          __dirname,
          "uploadedContracts",
          process.env.CONTRACT_NAME_TO_DEPLOY,
          newContractFolderName
        )
      );

      // ******************************* STORE Contract address *******************************
      fs.writeFileSync(
        path.join(
          __dirname,
          "uploadedContracts",
          process.env.CONTRACT_NAME_TO_DEPLOY,
          newContractFolderName,
          "createdContractAddress.txt"
        ),
        result.options.address
      );

      // ****************** Store ABI (Application Binary Interface) & Contract Bytecode ******************
      fs.writeFileSync(
        path.join(
          __dirname,
          "uploadedContracts",
          process.env.CONTRACT_NAME_TO_DEPLOY,
          newContractFolderName,
          "abi.txt"
        ),
        JSON.stringify(
          contracts[`${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`][
            process.env.CONTRACT_NAME_TO_DEPLOY
          ].abi
        )
      );

      // ************************************ STORE bytecode ************************************
      fs.writeFileSync(
        path.join(
          __dirname,
          "uploadedContracts",
          process.env.CONTRACT_NAME_TO_DEPLOY,
          newContractFolderName,
          "bytecode.txt"
        ),
        contracts[`${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`][
          process.env.CONTRACT_NAME_TO_DEPLOY
        ].evm.bytecode.object
      );

      // *********************** Copy the Contract File ************************
      fs.copyFile(
        path.join(
          __dirname,
          "contracts",
          process.env.CONTRACT_NAME_TO_DEPLOY + ".sol"
        ),
        path.join(
          __dirname,
          "uploadedContracts",
          process.env.CONTRACT_NAME_TO_DEPLOY,
          newContractFolderName,
          process.env.CONTRACT_NAME_TO_DEPLOY + ".sol"
        ),
        () => {}
      );
    }
  );
}

main();
