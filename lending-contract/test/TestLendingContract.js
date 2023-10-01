const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  it("should deposit and borrow successfully", async () => {
    const lendingContract = await LendingContract.deployed();

    // Deposit 1 ETH from the first account
    await lendingContract.deposit({ value: web3.utils.toWei("1", "ether"), from: accounts[0] });

    // Check the user's balance
    const userBalanceBefore = await web3.eth.getBalance(accounts[0]);

    // Borrow 0.5 ETH from the first account
    await lendingContract.borrow(web3.utils.toWei("0.5", "ether"), { from: accounts[0] });

    // Check the user's balance after borrowing
    const userBalanceAfter = await web3.eth.getBalance(accounts[0]);

    assert(userBalanceAfter < userBalanceBefore, "User balance should decrease after borrowing");
  });

  it("should not allow borrowing more than available liquidity", async () => {
    const lendingContract = await LendingContract.deployed();

    // Try to borrow 2 ETH from the first account
    try {
      await lendingContract.borrow(web3.utils.toWei("2", "ether"), { from: accounts[0] });
      assert.fail("Borrowing more than available liquidity should fail");
    } catch (error) {
      assert(error.toString().includes("Insufficient balance"), "Expected 'Insufficient balance' error");
    }
  });
});
