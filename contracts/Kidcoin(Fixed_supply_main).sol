// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Kidcoin is ERC20 {
    constructor() ERC20("Kidcoin", "KIDCOIN") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}