import Web3 from "web3";
require("dotenv").config();

(async () => {
  let CONTRACT_ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "indexedInfo",
      type: "event",
      signature:
        "0xa96fde54cb842d580032d9c9c0bc8754946c756f638d926202161acaa2ad44ed",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "normalInfo",
      type: "event",
      signature:
        "0x2e6437fe1485e71f9b091621c735c9555bd1119cbd94a165dadcdf963a393864",
    },
    {
      inputs: [],
      name: "callToGetCurrent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xc6ecd1b3",
    },
  ];

  let web3 = new Web3(process.env.ALCHEMY_API_KEY);

  let contract = new web3.eth.Contract(
    CONTRACT_ABI,
    process.env.CONTRACT_ADDRESS
  );

  let transactionObject = {
    chainId: process.env.BLOCK_CHAIN_ID,
    to: process.env.CONTRACT_ADDRESS,
    data: contract.methods.callToGetCurrent().encodeABI(),
    gas: process.env.BLOCK_CHAIN_ID == "137" ? 2100000 : 2100000, // -> gas Means gasLimit
    gasPrice: process.env.BLOCK_CHAIN_ID == "137" ? 300000000000 : 21000000000, // -> Exactly the given gasPrice will be cut down from blueliner account
  };

  let signedTransaction = await web3.eth.accounts.signTransaction(
    transactionObject,
    process.env.TRANSACTION_SIGNER_PRIVATE_KEY
  );

  const method = await web3.eth.sendSignedTransaction.method;
  let payload = await method.toPayload([signedTransaction.rawTransaction]);

  await method.requestManager.send(payload, async (result) => {
    console.log("Final result from blockchain: ", payload, result);
  });

  // ******************* Events Print *******************
  contract.events
    .indexedInfo(() => {})
    .on("connected", function (subscriptionId) {
      console.log("SubID: ", subscriptionId);
    })
    .on("data", function (event) {
      console.log("Event:", event);
      //Write send email process here!
    })
    .on("changed", function (event) {
      //Do something when it is removed from the database.
    })
    .on("error", function (error, receipt) {
      console.log("Error:", error, receipt);
    });
})();
