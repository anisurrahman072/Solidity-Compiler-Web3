const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.join(
  __dirname,
  "contracts",
  `${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`
);
const source = fs.readFileSync(lotteryPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    [`${process.env.CONTRACT_NAME_TO_DEPLOY}.sol`]: {
      content: `${source}`,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
    },
    evmVersion: "byzantium",
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

function findImports(_path) {
  console.log("A1: ", _path);
  if (_path[0] === ".") {
    return {
      contents: fs.readFileSync(path.join(__dirname, _path)).toString(),
    };
  } else {
    return {
      contents: fs
        .readFileSync(path.join(__dirname, "node_modules", _path))
        .toString(),
    };
  }
}

let response = null;

try {
  response = solc.compile(JSON.stringify(input), { import: findImports });
} catch (error) {
  console.log("Error: ", error);
}

module.exports = JSON.parse(response);
