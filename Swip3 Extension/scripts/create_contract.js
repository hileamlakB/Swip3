

function contract_str(caddress, user_address, coin_value){

  let create_contract = `
  
  // Swip3_ABI defined in shared.js
  const Swip3_ABI = ${JSON.stringify(Swip3_ABI)}

  window.web3 = new Web3(ethereum);


  let CONTRACT_ADDRESS = "${caddress}"
  let user_address = "${user_address}"
  // Create a contract object
  const Swip3 = new web3.eth.Contract(Swip3_ABI,CONTRACT_ADDRESS);

  
  const data = Swip3.methods.initateContract(1,[CONTRACT_ADDRESS, 0], [1, ${coin_value}]).encodeABI();
  const transactionParameters = {
    to: CONTRACT_ADDRESS, 
    from: user_address, 
    'value': web3.utils.toWei("${coin_value}", "ether"), 
    'data':data
    };

  web3.eth.sendTransaction(transactionParameters)
  .then(response=>{
    let last_transaction = response.logs.pop()
    console.log(last_transaction)
    const typesArray = [
      {type: 'string', name: 'message'}, 
      {type: 'address', name: 'contract_address'} 
    ];
    let caddress = web3.eth.abi.decodeParameters(typesArray, last_transaction.data);
    
    update(caddress);

    console.log(response)})
  .catch(error=>error)  
  `

  let inject_creat_contract = `


      let c_script_inject = document.createElement('script');
      c_script_inject.textContent = \`${`${create_contract}`}\`;

      document.documentElement.appendChild(c_script_inject);
  `

  return inject_creat_contract;
}


