pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "./SafeMath.sol";

/// @title LendingPool 
/// @author Hileamlak Yitayew, Matt Tengtrakool
/// @notice Lending pool for Swip3
/// @dev need help review 

contract LendingPool  {

    using SafeMath for uint256;

    uint256 public minimumAmt = 1 ether;
    address payable public owner;
    uint256 private totalDeposited;
    address public editor;
    

    mapping(address => uint256) addressToDollarAmt;
    mapping(address => uint256) public startTime;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public pendingPayment;
    mapping(address => bool) public allowed_pools;

    event LendingPoolMessage(string message, address from);

    constructor() {
        owner = payable(msg.sender);
        emit LendingPoolMessage("Lending pool created", msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only initial uploader can access this method");
        _;
    }

    modifier onlyEditor() {
        require(msg.sender == editor, "Only editor can access this method");
        _;
    }

    modifier onlyAllowedGate(){
        require(allowed_pools[msg.sender], "Only allowed gates can access this method");
        _;
    }

    function updateEditor(address new_editor) public onlyOwner{
        editor = new_editor;
        emit LendingPoolMessage("Editor updated to", new_editor);

    }

    function addGate (address pool_address) public onlyEditor{
        allowed_pools[pool_address] = true;
        emit LendingPoolMessage("new gate added", pool_address);
    }

    /// @notice lenders can deposit money to lending pool
    function deposit() public payable {
        require(msg.value >= minimumAmt, "Minimum 1 Ether Required");
        // addressToDollarAmt[msg.sender] += msg.value;
        startTime[msg.sender] = block.timestamp;
        stakedAmount[msg.sender] = stakedAmount[msg.sender].add(msg.value);
        totalDeposited = totalDeposited.add(msg.value);
        emit LendingPoolMessage("staked", msg.sender);
    }

    function lendingWithdraw(uint256 amount, address to) public payable onlyAllowedGate {
        
        require(amount <= totalDeposited, "Doesn't have enough balance in the bank");
        totalDeposited = totalDeposited.sub(amount);
        // pendingPayment[to] = pendingPayment[to].add(amount); Use this payment method to prevent rentry attack
        payable(to).transfer(amount);
        emit LendingPoolMessage("Money withdrawen to", to);

    }

    ///notice Stakers can use this function to take out thier money
    function depositWithdraw() public{
        require(stakedAmount[msg.sender] > 0, "You don't have any money in here");
        uint256 time_staked = (startTime[msg.sender] -  block.timestamp).div(86400);
        require(time_staked > 30 * 86400, "You should atleast stake for a monty");
        uint256 yield = stakedAmount[msg.sender] + time_staked.mul(5).mul(stakedAmount[msg.sender]).div(100);
        require(yield < totalDeposited, "Sorry we don't have enough money so comeback later");
        totalDeposited = totalDeposited.sub(yield);
        pendingPayment[msg.sender] = pendingPayment[msg.sender].add(yield);
    } 
    
    // Payed users can use this function to withdraw thier money
    function gateWithdrawl() public {
        require(pendingPayment[msg.sender] > 0, "You don't have no pending withdrawls");
        uint256 amount = pendingPayment[msg.sender];
        pendingPayment[msg.sender] =  0;    
        payable(msg.sender).transfer(amount);
    }

    receive() external payable {
    }
    
    fallback() external payable {
    }

}