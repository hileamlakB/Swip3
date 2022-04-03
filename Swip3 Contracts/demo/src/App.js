import './App.css';
import Button from '@mui/material/Button';
import nft from './images/nft.png';
import nft6 from './images/nft6.jpg';
import nft1 from './images/nft1.jpg';
import nft3 from './images/nft3.jpg';
import nft4 from './images/nft4.jpg';
import nft5 from './images/nft5.jpg';
import nft7 from './images/nft7.png';
import nft8 from './images/nft8.jpg';


import {useState, useEffect} from 'react';
import { Typography } from '@mui/material';


const RECIEVER = "0x673d3B583aD951bd7Dfe4fd7Da297659694a7ce0"



function NFT({startPayment, img}){
  return ( 
  <div style={{display:"flex", flexDirection:"column", margin:"100px !important", padding:"10px", justifyContent:"center", alignItems:"center"}}>
      <img src={img} alt="nft-sale" style={{width:"300px", height:"300px", margin:"5px", borderRadius:"10px"}}/>
      <Button variant="contained" onClick={startPayment} color="secondary" style={{maxWidth:"100px"}}>Buy</Button>
    </div>
  )
}


function App() {
  const [address, setaddress] = useState("");

  function startPayment(){
    if (window.pay){
      window.pay(address, RECIEVER, "5000000000000000000");
    }
    
  }

  async function connectWallet(){
 
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setaddress(addressArray[0])
        return {address:addressArray[0], status:1};
      } catch (err) {
        return {address:err.message, status:2};
      }
    } else {
      return  {address:"", status:3};;
    }

  }

  useEffect(() => {
    connectWallet();
  }, [])

  
  

  return (
   <div className="main" style={{justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
     <Typography color="primary" variant="h1">LIONHACK market place</Typography>
     {/* <Typography color="primary" variant="h1">Demo DAPP: NFT market place</Typography> */}
     <div style={{display:"flex"}}>
     <p style={{color:"#17B4E6"}}>{address? "Connected: " + address: "" }</p>
     <Button variant="contained" onClick={connectWallet} style={{maxWidth:"100px"}}>Connect</Button>
     </div>
     
     
      <div className='on-sale-nfts' style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly", padding:"0 200px"}}>
      <NFT startPayment={startPayment} img={nft}/>
      <NFT startPayment={startPayment}  img={nft1}/>
      <NFT startPayment={startPayment}  img={nft3}/>
      <NFT startPayment={startPayment}  img={nft4}/>
      <NFT startPayment={startPayment}  img={nft5}/>
      <NFT startPayment={startPayment}  img={nft6}/>
      <NFT startPayment={startPayment}  img={nft7}/>
      <NFT startPayment={startPayment}  img={nft8}/>
      <NFT startPayment={startPayment}  img={nft}/>
      <NFT startPayment={startPayment}  img={nft1}/>

      </div>
   </div>
  );
}

export default App;
