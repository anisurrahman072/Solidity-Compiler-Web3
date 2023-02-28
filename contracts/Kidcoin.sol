// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Kidcoin is ERC20 {
    constructor() ERC20("Kidcoin", "KIDCOIN") {
        _mint(msg.sender, 1000 * (10**decimals()));
    }
}
