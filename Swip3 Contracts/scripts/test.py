from brownie import Swip3, Swip3Customer, LendingPool, accounts

def main():
    accnt = accounts.load('h_test')
    LendingPool.at("0x7d57a951A3c4AB856726e0eeA24d88567eD74b1c").
    
    lending_pool_deployer =  accounts[0]
    Lending_pool = LendingPool.deploy({'from':lending_pool_deployer})
    tx = lending_pool_deployer.transfer({"to":Lending_pool, "amount":"10 ether"})
    print ("Lendin pool setup done, ", tx)
    
    swip3 = Swip3.deploy({'from':lending_pool_deployer})
    swip3.
    
    
    
    print(accnt.address, accnt.public_key)
