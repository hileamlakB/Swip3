# SWIP3
A credit based crypto-payment system for `Web3` 

## SWIP3 Extesnsion
It is an interface that lets people access crypto-lending pools and make payments to Dapps.

`swip3-extension` 
uses metamask to create an interface between users and smartcontracts to perform payments to Dapps. Currently, there are no advanced cryto-credit scoring systems, hence,  we use collaterals deposited by our users to ensure users don't leave with our crypto assets. This lets people keep the holding they deposited initially, however, also enabling them make transactions from lending pools with any kind of crypto coin.  

The extension is fully written in `Javascript` `HTML`, and `CSS`.

### Files and Folders
* This project contains three folders: `images`, `scripts`, and `styles`. 
* With in the scripts folder, we have 7 files

    * [main.js](./scripts/main.js) is mainly used to link a metamask account with the our system.
    * [background.js](./scripts/background.js) is used to store the public key of our user's metamask account in the browser. 
    * [deposit-script.js](./scripts/deposit-script.js) is called to store collaterals for further use by creating contracts

    * [create-contract.js](./scripts/create_contract.js) invokes a call to create smart contracts to the backend which is not `swip3 extensions` folder to the wallet selected by the user during the first steps. 
    
    * [complete-transaction.js](./scripts/complete_transaction.js) proceeds to buy the crypto products in a dapp from the lending pool by triggering methods in the backend.
    * [shared.js](./scripts/shared.js) contains variables that are used across the entire extension.
* The styles to the entire extension are found in the `styles` folder.
* We have three `html` files; One, for the first page while setting up the extension and creating a contract [index.html](./index.html)

### Running
Load the extension to the Firefox browser as a `temporary addon`, click the extension popup from the menu bar, and you are good to go!

### Executing the program:
* If the user is new to our system, the user needs to `Install Metamask`(if not already installed) and `Connect Wallet` from which the user wants to deposit the collaterals. 
* The user will then be taken to a different page where despositing takes place. Currently we only accept crypto coins, however, in future versions a person will be able to use NFTs as collaterals. 
* The user is all set and ca go make transactions.



### List of useful commands
* `cat` - prints and concatenates files to the standard output
* `cp` -copies a file into another file
* `grep` - helps to search for a file in a specific pattern
* `less` - will let you go backward and forward in the files
* `ls` - will list all files and directories in current working directory
* `mv` - helps to move one file into another file
* `pwd` - given you the current working directory


### Author
* Hileamlak, Matt, Bereket 