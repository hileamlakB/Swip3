window.addEventListener("DOMContentLoaded" ,checkState);
inject_api();

async function checkState(){

    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    browser.storage.local.get("contract_address").then(
        (result)=>{
            if (Object.keys(contract_address).length == 0)
            {
                // delete injected code
                browser.browserAction.setPopup({tabId: tab.id,popup:"/index.html"});
            }
        },
        (error) => {
            console.log(error);
        }
    )
    
}
document.body.querySelector("#pay").addEventListener('click', ()=>{
    // perform assertion on user inputs
    let pay_amount = parseInt(document.body.querySelector("#pay_amount").value);
    let to = document.body.querySelector("#to_address").value;
  
    browser.tabs.executeScript({
      code:`pay("${account}", "${to}", web3.utils.toWei("${pay_amount}", "ether"))`
    }).then(result=>{console.log(result)});
  
})
