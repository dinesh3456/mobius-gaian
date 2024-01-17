//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SendToken is ERC20, Ownable {
    constructor(
        address initialOwner
    ) Ownable(initialOwner) ERC20("MYTOKEN", "MYT") {
        _mint(msg.sender, 1000 * (10 ** decimals()));
    }

    function getBalance(address addr) public view returns (uint) {
        return balanceOf(addr);
    }

    function transfer(
        address addr,
        uint amount
    ) public override onlyOwner returns (bool) {
        require(amount > balanceOf(addr), "You don't have enough balance");
        require(amount > 0, "Please enter the correct amount");
        _transfer(msg.sender, addr, amount);
        return true;
    }
}
