# Solidity Compiler Web3

> This project is intended to learn it's audience that how to Compile Solidity Contract using Solidity official Compiler.

> Deploy the Contract to Blockchain using a Provider like Alchemy by Web3.js.

> After successful deployment access your deployed Contract using Web3.js by simply running `npm run dev`

## Code Introduce

>

- `/contracts` Folder where all your Smart Contract will stay
- `compile.js` is for Compiling your Smart Contract
- `deploy.js` to deploy Contract in Blockchain
- `/src/index.js` to access your deployed Smart Contract using Web3.js

## Setup

>

- `git clone git@github.com:anisurrahman072/Solidity-Compiler-Web3.git`
- `npm install`
- Create `.env` file following `.env-demo`
- Add your Smart Contract in `/contracts` folder with `.sol` extension
- Run node `deploy.js` to Compile & deploy your Smart Contract in Blockchain
- After successfull deployment you will see 3 file created in root directory
  1. `abi.txt`
  2. `bytecode.txt`
  3. `createdContractAddress.txt`
- Copy the `abi.txt` inside `/src/index.js` variable `CONTRACT_ABI`
- Simply run `npm run dev` to make your very first Transaction in your deployed Smart Contract
