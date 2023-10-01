// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingContract {
    mapping(address => uint256) public balances;
    uint256 public totalLiquidity;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        totalLiquidity += msg.value;
    }

    function borrow(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Implement more checks here, e.g., loan-to-value ratio

        // Transfer assets to the borrower
        payable(msg.sender).transfer(amount);

        // Update balances
        balances[msg.sender] -= amount;
        totalLiquidity -= amount;
    }
}
