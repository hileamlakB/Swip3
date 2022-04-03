pragma solidity ^0.8.0;

contract Test{

    function get_balance(address balance_of) view public returns(uint256){
        return (balance_of.balance);
    }

    function current_block() view public returns(uint256){
        return (block.timestamp);
    }
}