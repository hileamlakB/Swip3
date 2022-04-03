from brownie import Swip3, accounts

def main():
    accnt = accounts.load('h_test')
    Contract = Swip3.deploy({
        'from':accnt
    })
    print(accnt.address, accnt.public_key)
