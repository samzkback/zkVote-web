import React, { use, useContext, useEffect } from 'react';
import { connectSnap } from '../../utils/snap';
import { getIdentityCommitment, updatePrivSeed } from '../../utils/vote';
import { useState } from 'react';
import { WalletContext } from '../../contexts/WalletContext';

export default function WrappedConnectButton () {
  const [idc, setIdc] = useState<any>();
  const [currentAccount, setCurrentAccount] = useState("");
  const { setAddress, setIsSnapInstalled } = useContext(WalletContext);
  
  const connectMetaMask = async () => {
    try{
      const {ethereum } = window;
      if(!ethereum){
        alert("Please install metamask");
        return;
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      const account = accounts[0];
      console.log("account", account);
      setCurrentAccount(account);
      setAddress(account);
    } catch (error) {
      console.log(error);


    }
  }
  useEffect(() => {
    console.log("current account", currentAccount);
  }, [currentAccount]);
  
  async function handleOnClick(){
    console.log("clicked");
    const res = await connectSnap();
    setIsSnapInstalled(res);
    await connectMetaMask();
  }

  useEffect(() => {
    console.log("idc yo ", idc)
  }, [idc]);
  return (
    <>
    {idc ? <button className='w-40 border border-black border-1 px-4 py-2 rounded-3xl bg-[#5FFF37]'><p className='trucate' style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{idc}</p></button> : 
  <button onClick={handleOnClick}><img className='h-10'src='/nav/connect.png'/></button>}
    </>);

};

