pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "./SafeMath.sol";
import "./LendingPool.sol";


/// @title LendingPoolGate  
/// @author Hileamlak Yitayew, Matt Tengtrakool
/// @notice Transfers money from lending pool to preffered address
/// @dev Only whitelisted smart contracts can ask to withdraw money form lending 
///      pools and only the smart contract contract that created this contract
///     can update the whitelist
contract LendingPoolGate {

    using SafeMath for uint256;

    address public parent_contract;
    address[] private users_list;
    uint256[] private freed_index;
    uint256 public max_nuser;
    LendingPool public lending_pool;

    mapping (address => uint) pendingWithdrawals;

    event LendingPoolGateMessage(string message, address related, uint256 token);


    modifier onlyWhiteListed(uint256 requester_id){
        //  Handle cases of overflow and malcious requester_id's
        require(requester_id < users_list.length);
        require(users_list[requester_id] != address(0x0), "Deleted Contract");
        require(msg.sender == users_list[requester_id], "Smart contract not allowed to withdraw money throught this gate");
        _;

    }

    modifier onlyParent(){
        require(msg.sender == parent_contract, "Only creating contract can call this function");
        _;
    }

 
    constructor(uint256 total_users, address lending_pool_address){
        parent_contract = msg.sender;
        max_nuser = total_users; 
        lending_pool = LendingPool(payable(lending_pool_address));
        emit LendingPoolGateMessage("Lending pool gate created by", parent_contract, 0);
    }

  
    /// @notice Adds a new smart contract to a whitelist
    /// @dev Only parent smart contract could make this request
    /// @param contract_address Address to add to the whitelist
    /// @return id returns the id contract_address should use to withdraw_money, and the status of the white list
    ///             true meaning free space is available and false meaning the opposite
    function append2WhiteList(address contract_address) 
        public
        onlyParent
        returns (uint256, bool)
    {
       
        require(users_list.length < max_nuser || freed_index.length != 0, "White list is full");
        if (freed_index.length != 0){
            uint256 id = freed_index[freed_index.length.sub(1)];
            users_list[id] = contract_address;
            freed_index.pop();
            emit LendingPoolGateMessage("Added to white list", contract_address, id);
            return (id, users_list.length < max_nuser || freed_index.length != 0);
        }else{
            //  Make sure pushing won't overflow
            users_list.push(contract_address);
            emit LendingPoolGateMessage("Added to white list", contract_address, users_list.length.sub(1));
            return (users_list.length.sub(1), users_list.length < max_nuser || freed_index.length != 0);
        }
        

    }


    /// @notice Delete an account from the whitelist
    /// @dev Only creator smart contract can delete element from a whitelist
    /// @param id Id of smart contract to be deleted, must be already in whitelist
    function deleteFromWhiteList(uint256 id) 
        public
        onlyParent
    {
        require(id < users_list.length, 'Token not created');
        require(users_list[id] != address(0x0), "account already deleted");
        users_list[id] = address(0x0);
        freed_index.push(id);
    }

    /// @notice Withdraws money from a lending pool and pays to a requested user
    /// @dev Only whitlisted smart contract can access this function
    /// @param requester_id Whitlist id of smart contract provided during creation
    /// @param reciever_address Adress money is to be transfered to
    /// @param amount amount of money to be transferred
    /// @return sucess true if payment was successfull or false if it fails.
    function payDapp(uint256 requester_id, 
        address reciever_address, uint256 amount) 
        onlyWhiteListed(requester_id)
        public
        returns(bool)
    {
        // Withdraws money from pool 
        // (this might not be necessary if the gate becomes a pool itself but )
        // Making it a pool might be hard to handle interest and stuff so my choice
        // is this model
        // check if reciever_address is  valid payable adress and if it isn't respond with false

        lending_pool.lendingWithdraw(amount, reciever_address); 
        return true;
    }

    function withdrawMoney() public{
        uint256 amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
          
    }

    function withdrawFromPool() private{

        // The lendingpool gate might itself be a lending pool byitself if that is a bettermodel
    }

    function informParent() private{
        // When a whitelist position clears up a parent should know about it
    }

    
}