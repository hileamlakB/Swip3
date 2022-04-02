// This is for the toggle between NFT and Conis
// There is also the input text description toggle as well.

// User interactions
const choices = document.querySelectorAll(".choice")
const selectionText = document.getElementById("amount-address-text")
let active = ""

choices.forEach(card => {
    card.addEventListener('click', () =>{
        removeAllClasses()
        card.classList.add("selected");
        active = card.id;
        changeText(active)
    }
    );
})



function removeAllClasses(){
    choices.forEach(card =>{
        card.classList.remove("selected");
    })
}

function changeText(active){ 
    if(active == "NFT"){ 
        selectionText.innerHTML = "Enter NFT Address"
    }
    else if (active == "Coins"){ 
        selectionText.innerHTML = "Enter Amount"
    }
    else{ 
        selectionText.innerHTML = "Please select above"
    }
}

// taking care of the modal
const contButton = document.getElementById("continue")
const confirmButton = document.getElementById("confirm")

const modal = document.getElementById("modal")
const nftCard = document.getElementById('nft-id')


async function get_contract_address(exec_result){
 
    browser.storage.local.get("contract_address").then(
        (result)=>{
            contract_address = result.contract_address
            inject_api();
            browser.browserAction.setPopup({tabId: tab.id,popup:"/complete-transaction.html"});
        },
        (error) => {
            console.log(error);
        }
    )
    
    
}

contButton.addEventListener("click" ,() => {

    if(active == "NFT"){
        modal.classList.toggle("off")
        modal.classList.toggle("on")

        nftCard.classList.toggle("off")
        nftCard.classList.toggle("on")
    }  
    else{ 
        const  amountToBeSent = parseInt(document.getElementById("amount-address").value);
        
        
        const executing = browser.tabs.executeScript({
            code: contract_str(SWIP3_address, account, amountToBeSent)
          });

          executing.then(get_contract_address,
            (error)=>{console.log(error)});
    
               
    }
})

confirmButton.addEventListener("click" ,() => {
   
    modal.classList.toggle("off");
    modal.classList.toggle("on");
    
    nftCard.classList.toggle("off")
    nftCard.classList.toggle("on")
 
})


//showing the user account address()
const acccountPk = document.getElementById("accountPk")
let PKvalue = ""
function showAccount(){ 
    PKvalue = localStorage.getItem('swip3.eth.pk').slice(0,8)
    acccountPk.innerHTML = PKvalue

}


