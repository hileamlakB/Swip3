# Swip3
__Your Web3 credit card__. Swip3 is a lending protocol that allows users to take out lines of credit and pay with leverage directly on DApps.



## Introduction

E-commerce microtransactions of goods and services are moving onto Web3. Many functions of web2 finance are replicated to keep up with this demand. We believe this demand for web3 dapps not limited to but including nft market places and games is only going to increase as public transaarent backends became the norm. And when this happens there will be the need for a web3 equivalent of credit cards (per payment loans). Banks and loaning instituations have been built in recent years, and we want to capitalize on that knowledge to move the Defi space forearward.  

Currently buyers pay for everything out of pocket by connecting their wallets directly to DApps, essentially paying for everything using your Web3 debit card. Security, leverage, and convenience can lower the activation energy for crypto payment transactions, ushering in greater adoption in the web3 space.

We introduce Swip3, your web3 credit card, providing per-payment loans in the palm of your hands. With our extension and developer API, users can easily leverage crypto and pay directly on DApps with their Swip3 cards.


## How Does it Work

__Never connect your wallet to DApp again:__

* We abstract DeFi lending and break it down to use for payments. In terms of existing web2 services if you assume lending pools and protocols like AAVE and MakerDAO to be banks that lend huge sum of money with a collateral we are trying to be the master card and visa cards providing a secure (based on collateral) credits. 
* 
* Based on collateral, we provide a credit limit contract. This allows users to:
    * Leverage payments and keep exposure to assets
    * Harness security for flagged sites and scams
    * Get cash back for payments using yield farming
    * Use DApp native execution
    * Build a web3 credit score ( for future unsecure credit cards)
 
## What does it look like?

Currently, for our mvp, we use metamask as our underlying tool to handle private keys, thus our app extension will require the user (dapp programer) to connect to metamask. Following are pictures of the extension and the first pages requiring metamask.

![Extension Picture](/Assets/extensionpicture.png)
![Install Metamask](/Assets/installFirst.png)
![Connect Wallet](/Assets/connect%20wallet.png)

 To demonstrate how a user might interact with our system, Once metamask is installed and connected, lets introdue a simple demo Dapp. This dapp simulates an nft market place, in that it has one nft for sell. The dapp developers can choose to integrate a swip3 payment method (which we will show how to later in this section).

 ![Demo webapp](/Assets/webdemo.png)
 The demo has a simple interface and a buy function which use our API.

 Here is what the steps a user might take look like in an event driven manner.

 Initially, only for the first time, a user needs to create a contract with the Swip3 system. This contract will be defining credit limits, balances due, payment cycles and much more information governing the use of the credit card. For more information on contract development, look at the files sections below. The extension page to create new contract looks like the following.

 ![Deposit collateral Page](/Assets/deposit.png)
 Here as explained a user can use thier web3 assets as a collateral. More specifically, they can use NFTs and different kinds of COINS. For this MVP, only as a proof of concept, we are using Ethereum as the coin. But the idea is to have sister contracts in different chains and also on ethereum to recieve different coins and provide an ethereum line of credit. Once a user decides the amount and type of asset they want to use as a collatoral they can press the continue button and a smart contract between our Swip3 system and the user is created. 

 Once a contract is created, whenever the extension is opened the following is the page that will be displayed.
 ![transaction page](/Assets/complete-transaction.png)
 Through this pay function, users can transfer money to anyone they want from thier available credit instead of thier wallet. But we would expect dapps to integrate our API's and users won't even have to see our extension after the initial setup.

 All Dapp programers have to do to integrate our extension is include the following code in a browser where our extension is installed.
 ```
  if (window.pay){{* Check if pay function is injected by the extension. If an initall contract is created initially this will be done by the extension *}
      {* All the dapp program have to do is call this pay function along with address (users address which can be found using metamask)
        RECIEVER, dapp developers account, and amount of ether in wei. 
        This will then trigger metamask for user signiture,  once that is done 5 ether will be transfered from our lending pools to the dapp according to 
        the credit smart contract agreement.
      *}
      window.pay(address, RECIEVER, "5000000000000000000");
    }
 ```

 This is demonstrated in the demo [app](/Swip3%20Contracts/demo/src/App.js).



## Swipes Suite of Products

* Swip3 Extension — users can create line of credit contract and access their Swip3 card directly on DApps with our extension, or directly pay to whoever they want using our extension.
* Developer API — calling just a single function, developers can integrate our API to allow credit payments on their DApps.
* Lending Pool SDK — lending pools can use Swip3 infrastructure to port new credit flows from per-payment loans from their lending pools with our SDK.

## Our Vision

Swip3 is extending access to per-payment leverage as the credit standard for users, DApps, and lending pools alike. By extending our developer API and partnering with existing pools on SDK integrations like AAVE, MakerDAO and Compund, we hope to build the infrastructure for a novel payment network.

Into the future, we are iterating quickly to include greater KYC, collateral yields, lending assets, and credit scoring — ultimately hoping to shift toward a lower friction uncollateralized model. Moreover, we are focusing especially on user-end security — providing greater fraud protection mechanisms and payment analytics.

We are blazing the trail for web3 credit and expanding adoption from our initial goal of 1000+ DApps to 1B+ users. DeFi is here to stay, Swip3 is bringing it to the masses.


## Files

- The files realted to the extension can be found inside [Swip3 Extension](/Swip3%20Extension/) and detials explaining the file strucutre is found in the [Readme](/Swip3%20Extension/README.md) in that folder.
  
- The Contracts are found in [Swip3 Contracts](/Swip3%20Contracts/) and here is a short description of all the extensions (more detials can be found in the comments themselvs).
  - [LendingPool.sol](/Swip3%20Contracts/contracts/LendingPool.sol): A sample lending pool with basic lending pool functionalities, going to be replaced with copperations with existing lending protocols like AAVE, Compund and Maker DAO in future updates.
  - [LendingPoolGate.sol](/Swip3%20Contracts/contracts/LendingPoolGate.sol): A secruity feature to filter access to lending pool
  - [Swip3.sol](/Swip3%20Contracts/contracts/Swip3.sol): Our protocol and credit system MVP.
  - [Swip3Customer.sol](/Swip3%20Contracts/contracts/Swip3Customer.sol): Credit contract that is going to be credit between our Swip3 contract and users

## Teams

We are a team of three enthusiastic builders who wish to add thier positive fingerprints to the growing human advancment. We love web3 because there is 
a lot of potential for contribution.

Each of has different levels experience in the web3 space. Matt Tengtrakool, Harvard Class of 2025, the wisest of us, had experience in 
the investment, VC side of Web3 for a while. He recently (6 months ago) anlong with our other member (Hileamlak Yitayew, his roomate) started development 
in web3. They started out with the NFT space, and moved Dapps and now for the first time are exploring the DeFi space. Our third member 
Berket Molla, Columbia class of 2025, had no prior web3 experience and this is his first DeFi project.

In this project, on top of the DeFi space we have learned to make browser extensions. Our current extension is browser dependant and can only work in 
firefox, but this is something we hope to improve in the future.

Other tools used:
    - Solidity, Brownie, Python (with brownie, testing), Ganache, Metmask, ReactJs (demo app), Javscript(API development) 
