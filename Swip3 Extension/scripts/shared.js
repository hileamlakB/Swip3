let ethInstalled = false;
// check if account exists
let account = null;
let contract_address = null;
const SWIP3_address = "0x31AeC7e31c16f66E536199047A14ab69203938d3";


const Swip3_ABI =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "unimplemented_service",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "new_contract",
        "type": "address"
      }
    ],
    "name": "ContractMessage",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "Swip3_deployer",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gate_ids",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gate_max_nuser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum Swip3.Assets",
        "name": "asset_type",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "token_id",
            "type": "uint256"
          }
        ],
        "internalType": "struct Swip3.NFTProps",
        "name": "nft_data",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "enum Swip3.Coins",
            "name": "coin_type",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct Swip3.CoinPops",
        "name": "coin_data",
        "type": "tuple"
      }
    ],
    "name": "initateContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lending_pool_address",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "updateGateState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

const Swip3Customer_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_expiration_date",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_smart_contract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_credit_limit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_APR",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Expired",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "ContractTerminated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "Swip3CustomerMessage",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "acceptPayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_lending_poolGate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_lending_poolID",
        "type": "uint256"
      }
    ],
    "name": "activate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "availableCredit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "expiration_date",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "reciever_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "requestPayment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "state",
    "outputs": [
      {
        "internalType": "enum Swip3Customer.State",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "terminate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "updateCredit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "updateExpiration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawOverPayed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]
  


function update_account(){
    if (document.getElementById("accountPk")){
        document.getElementById("accountPk").innerText = account.slice(0,10);
    }
}
if (document.getElementById("user-account-copy")){



document.getElementById("user-account-copy").addEventListener("click", () => {
  console.log("clicked")
  navigator.clipboard.writeText(account)
        .then(() => {
       console.log("copied")
    })
        .catch(err => {
      console.log("not copied")
    })
});
}

function toolTip(message){ 
// Messages
}

async function inject_api(){
    
    browser.tabs.executeScript({
        code:`
        let pay_function = \`
        window.web3 = new Web3(ethereum);
        const Swip3_ABI = ${JSON.stringify(Swip3Customer_ABI)}
        let Swip3Customer_address = "${contract_address}"
        const Swip3Customer = new web3.eth.Contract(Swip3_ABI, Swip3Customer_address);

        

        function pay(user_address, to, amount){
        
            const data = Swip3Customer.methods.requestPayment(to, amount).encodeABI();
            const transactionParameters = {
                to: Swip3Customer_address, 
                from: user_address, 
                'data':data
                };

            web3.eth.sendTransaction(transactionParameters)
                .then(response=>{console.log(response)})
        }
        \`

        let pay_script = document.createElement('script');
        pay_script.textContent = \`\${pay_function}\`;
  
        document.documentElement.appendChild(pay_script);   
        `
    }).then(result => {console.log(result)});
    
   
}
