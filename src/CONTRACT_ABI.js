export const CONTRACT_ABI = [
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
