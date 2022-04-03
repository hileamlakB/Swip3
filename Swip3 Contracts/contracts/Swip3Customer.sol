pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import {SafeMath} from "./SafeMath.sol";
import {LendingPoolGate} from "./LendingPoolGate.sol";


/// @title Swip3Customer - an agreement between the swip3 credit service and customer
/// @author Hileamlak Yitayew
/// @notice The terms of this contract will dictate the transfer of credit 
/// @dev Except view function only parent contract and user can access this contract 
contract Swip3Customer {

    using SafeMath for uint256;

    address private user;
    address private parent_contract;
    uint public expiration_date;
    LendingPoolGate lending_poolGate;
    uint256 private lending_poolID;

    enum State {STARTING, EXPIRED, ACTIVE, TERMINATED}
    State public state;

    /// Contract has expired
    error Expired();
    ///Contract has been terminated
    event ContractTerminated();
    event Swip3CustomerMessage(string message);
    

    // credit realted states
    uint256 private credit_limit;
    uint256 private balance;
    uint256 private other_fees;
    uint256 private interest_fees;
    uint256 private APR;
    uint256 private over_payed;
    bool private good_standing;
    uint private last_payed_date;
    uint private payment_cycle;



    modifier onlyUser{
        require(msg.sender == user, "Only user can access this method");
        _;
    }

     modifier onlyParent{
        require(msg.sender == parent_contract, "Only parent can access this method");
        _;
    }

    modifier checkState(){
        require(state == State.ACTIVE, "Contract state isn't active");
        _;
    }

    modifier checkAuthorization(){
        require(msg.sender == user || msg.sender == parent_contract, "Unauthorized user");
        _;
    }

    modifier checkExpiry(){
        if(state == State.EXPIRED || block.timestamp > expiration_date){
            state = State.EXPIRED;
            revert Expired();
        }
        _;
    }


    //CHECKED
    constructor (uint _expiration_date, address _smart_contract, 
                address _user, uint256 _credit_limit, 
                uint256 _APR)
            {
        emit Swip3CustomerMessage("A child just opened its eyes");
        user = _user;
        parent_contract = _smart_contract;
        expiration_date = _expiration_date;

        state = State.STARTING;

        credit_limit = _credit_limit;
        APR = _APR;
        good_standing = true;
    }


   
    /// @notice A started contract must be activated to start working
    /// @dev Activation connects smart contract to its designated lending pool
    /// @param _lending_poolGate address of lending pool gat
    function activate(address _lending_poolGate, uint256 _lending_poolID) 
        public
        onlyParent
    {

        lending_poolGate = LendingPoolGate(_lending_poolGate);
        lending_poolID = _lending_poolID;
        state = State.ACTIVE;
        emit Swip3CustomerMessage("I am now activated");
    }
  
   
    function requestPayment(address reciever_address, uint256 amount) 
        public 
        checkAuthorization 
        checkExpiry
        checkState
        returns (bool)
    {
   
        checkStatus();
        require(amount <= availableCredit(), "No available credit for this cycle");
        bool payed = lending_poolGate.payDapp(lending_poolID, reciever_address, amount);
        if (payed){
            balance = balance.add(amount);
        }
        return payed;
    }

    function acceptPayment()
    onlyUser
    checkState
    public
    payable
    {
        if (msg.value > balance){
            over_payed = msg.value.sub(balance);
            balance = 0;
        }
        else{
            balance = balance.sub(msg.value);
        }

    }

    function withdrawOverPayed() 
        onlyUser
        checkState
        public
    {
        uint256 owed = over_payed;
        over_payed = 0;
        payable(msg.sender).transfer(owed);

    }

    function availableCredit() 
        public 
        view
        returns(uint256)
    {
        return credit_limit.sub(balance);
    }

    function terminate() 
        public
        checkAuthorization 
        checkExpiry
        checkState
    {

        // check credit status and other detials before terminating deal
        require(balance == 0, "Balance must be 0 before termianting a deal");
        require(over_payed == 0, "There is unwithdrawm money. Withdraw your money!");
        state = State.TERMINATED;
        // returns escrowed content
        //  Move any potention money contained in this account into the lending pool gate
        //  
        emit ContractTerminated();
        // Tell parent contract has been deleted
        // Tell lending pool to forget about it
        

    }

    function updateCredit() 
        public
        checkAuthorization 
        checkExpiry
        checkState{
        
    }

    function updateExpiration() 
        public
        checkAuthorization 
        checkExpiry
        checkState{
        
    }


    function calculateInterest() private{

    }
    function isInGoodStandin() private{

    }

    function checkStatus() public{
        // 

    }

    receive() external payable {
    }
    fallback() external payable {
    }

}