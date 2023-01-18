// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    event indexedInfo(address indexed from, uint256 time);
    event normalInfo(address from, uint256 time);

    function callToGetCurrent() external {
        emit indexedInfo(msg.sender, block.timestamp);
        emit normalInfo(msg.sender, block.timestamp + 1 weeks);
    }
}
