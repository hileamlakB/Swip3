from brownie import Swip3, accounts

def main():
    accnt = accounts.load('h_test')
    for x in range(10):
        accounts[x].transfer(accnt, accounts[x].balance() // 2)
        # transfer(accnt, "50 ether")
    # Contract = Swip3.deploy({
    #     'from':accnt
    # })
    print(accnt.address, accnt.public_key)
