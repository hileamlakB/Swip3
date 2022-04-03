let loginButton = document.body.querySelector(".button-cta2");
const executing = browser.tabs.executeScript({
    code: `
    (function checkMeta(){
        
        let eth_window = window.wrappedJSObject.ethereum
        if (!eth_window){
            return [false, null]
            
        }
        else{
            // console.log(eth_window.selectedAddress)
            return [true, eth_window.selectedAddress]
        }
       
    })()`
  });
  executing.then((result)=>{[ethInstalled, account] = result[0]; console.log(account,ethInstalled); changeButton(); update_account()}, (error)=>{console.log(error)});


window.addEventListener("DOMContentLoaded", changeButton()); // is it possible to do this even before page is loaded in enabled pages

function connectWallet(){


  
    const executing = browser.tabs.executeScript({
      code:` 
  
      
  
      try{
        temp.textContent = "connect()"

      }
      catch{
        let connect = \`
            async function connect () {
                
                if (window.ethereum) {
                    try {
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    return {address:addressArray[0], status:1};
                    } catch (err) {
                    return {address:err.message, status:2};
                    }
                } else {
                    return  {address:"", status:3};;
                }
            }
            connect();
            \`

        let connect_script = document.createElement('script');
        connect_script.textContent = \`\${connect}\`;
        let temp = document.createElement('script');
        temp.classList.add('temp_script');
    
        document.documentElement.appendChild(connect_script);
        document.body.appendChild(temp);
      }
         
      `
    });
    executing.then(()=>update_account(), (error)=>{console.log(error)});
      
  }

 async function changeButton(){ 

    // if wallet is already connected move on to the next page
    
     if (account){
      
        if(window.location.href.includes("index.html")){
        
                
            let [tab] =  await browser.tabs.query({ active: true, currentWindow: true });
            contract_address = await  browser.storage.local.get("contract_address");
    

            if (Object.keys(contract_address).length){
                contract_address = contract_address.contract_address;
                inject_api();
                window.location.replace("/complete-transaction.html")
                
            }
            else {
                contract_address = ""
                location.replace("/deposit-collateral.html")
                
                
            }
       
     
        }
    
   }
   else{ 
        loginButton.innerHTML = !ethInstalled? "<a href='https://metamask.io/'>Install Metamask</a>" : '<button id="connect_btn" >Connect wallet </button>' 
        document.body.querySelector("#connect_btn").addEventListener("click", connectWallet);

    }
  
}

async function getAccount() { 
   
    
}




 
