pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "./SafeMath.sol";
import {Swip3Customer} from "./Swip3Customer.sol";
import {LendingPoolGate} from "./LendingPoolGate.sol";
import {LendingPool} from "./LendingPool.sol";


/// @title Swip3
/// @author Hileamlak Yitayew
/// @notice Creates Swip3contracts between users and iself
/// @dev Uses the Swip3Customer iterface to create Swip3 customer contracts

contract Swip3 {

    using SafeMath for uint256;
    address payable public Swip3_deployer;
    address public lending_pool_address;
    uint256 public gate_max_nuser;


    LendingPoolGate[] private gates;
    uint256[] free_gates;
    mapping(address => uint256) public gate_ids;

    event ContractMessage(string message, address new_contract);

    enum Assets {NFT, COIN}
    enum Coins {BITCOIN, ETHEREUM, CARDANO}

    struct NFTProps{
        address factory;
        uint256 token_id;
    }

    struct CoinPops{
        Coins coin_type;
        uint256 value;
    }

    /// Feature isn't yet implemented
    error unimplemented_service();

    
    modifier inGates(){
        require(address(gates[gate_ids[msg.sender]]) == msg.sender, "Gate not owned");
        _;
    }


    constructor(){
        Swip3_deployer = payable(msg.sender);
        gate_max_nuser = 1000;
        lending_pool_address = address(0x4a597B8AA6cD150AAE24EfC5895B6E30510Fca19);
    }

    // function removeFreeGate(address gate_address) internal{
    //     free_gates[gate_ids[gate_address]] = free_gates[free_gates.length - 1];
    //     free_gates.pop();
    // }

   

    /// @notice Find a free lending pool for contract_address
    /// @dev checks if already existing gates have more space other wise creats more
    /// @param contract_address address to be added to a white list
    /// @return tuple retruns address of lending pool along with token id

    function matchWithLendingPool(address contract_address) 
        private
        returns (address, uint256)
    {
        if (free_gates.length == 0){
            LendingPoolGate new_gate = new LendingPoolGate(gate_max_nuser, lending_pool_address);
            gates.push(new_gate);
            gate_ids[address(new_gate)] = gates.length.sub(1);
            free_gates.push(gates.length.sub(1));
            LendingPool(payable(lending_pool_address)).addGate(address(new_gate));
        }

        assert(free_gates.length != 0);

        LendingPoolGate free_gate = gates[free_gates[free_gates.length.sub(1)]];
        (uint256 id, bool stat) = free_gate.append2WhiteList(contract_address);

        if (!stat){
            free_gates.pop();
        }

        return (address(free_gate), id);


    }


    /// @notice Creates a contract between swip3 protocol and user
    /// @dev Puts asset in escrow and depending on that calculates credit
    /// @param asset_type the staked asset, either nft or coin
    /// @param nft_data if the staked asset is nft this infomation should be filled
    /// @param coin_data if the staked asset is coin this infromation should be filled
    /// @return returns contract address
    function initateContract (Assets asset_type, NFTProps memory nft_data,
                             CoinPops memory coin_data) 
        public 
        payable
        returns(address)
    {
        if (asset_type == Assets.COIN){
            if (coin_data.coin_type  == Coins.ETHEREUM){
                
                // Currently credit is the same as deposited money
                (uint256 credit_limit, uint256 APR) = evaluateCoinStake();
                // The lockStake function is only going to be usefull in the future
                lockStake();
                Swip3Customer user_contract = new Swip3Customer(block.timestamp.add(30 * 86400), 
                                                    address(this), 
                                                    msg.sender, credit_limit, 
                                                    APR);
                (address gate, uint256 id) = matchWithLendingPool(address(user_contract));
                user_contract.activate(gate, id);
                
                emit ContractMessage("User contract created at", address(user_contract));
                return address(user_contract);

            }
            else{
                // If the coins is different from Ethereum use 
                // multi chain tools to verify if transaction has sent money to 
                //  sister account
                 revert unimplemented_service();
            }

        }
        else if (asset_type == Assets.NFT){

            // Token smart contract address
            // Token id
            // NFT must follow the ERC-721 standard
            evaluateNFTStake(nft_data);
            revert unimplemented_service();
        }
        else{
            revert unimplemented_service();
        }

    }

    function evaluateNFTStake(NFTProps memory nft_data) 
        private
        returns (uint256)
    {
        
       (bool success, bytes memory returnData) =  nft_data.factory.call(abi.encodeWithSignature("ownerOf(uint256)", nft_data.token_id));
        require (success, "NFT contract hasn't responded");
        require(abi.decode(returnData, (address)) == address(this), "NFT not transferred to smart contract");

        // Evaluate the value of nft
        uint256 credit_limit = 1000;

        return credit_limit;
    }

    function evaluateCoinStake()
        private
        view
        returns (uint256, uint256)
    {
        // Evaluate the value of nft
        uint256 credit_limit = msg.value;
        uint256 APR = 20;

        return (credit_limit, APR);
    }

    function lockStake()
    private
    {
        // put asset in escrow
    }

    function updateGateState() 
    inGates
    public{
        free_gates.push(gate_ids[msg.sender]);
    }

    receive() external payable {
    }
    fallback() external payable {
    }

    

    
}