//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SendToken is ERC20 {
    constructor() ERC20("MYTOKEN", "MYT") {
        _mint(msg.sender, 1000 * (10 ** decimals()));
    }

    address public owner;

    modifier Onlyowner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function getBalance(address addr) public view returns (uint) {
        return balanceOf(addr);
    }

    function TransferToken(address addr, uint amount) public Onlyowner {
        require(amount > balanceOf(addr), "You don't have enough balance");
        require(amount > 0, "Please enter the correct amount");
        _transfer(msg.sender, addr, amount);
    }
}
