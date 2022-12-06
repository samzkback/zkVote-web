import React, { use, useEffect } from 'react';
import { connectSnap } from '../../utils/snap';
import { getIdentityCommitment, updatePrivSeed } from '../../utils/vote';
import { useState } from 'react';

export default function WrappedConnectButton () {
  const [idc, setIdc] = useState<any>();
  const [currentAccount, setCurrentAccount] = useState("");


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
    } catch (error) {
      console.log(error);


    }
  }
  useEffect(() => {
    console.log("current account", currentAccount);
  }, [currentAccount]);

  // useEffect(() => {
  //   const updateAndFetch = async () => {
  //     if(currentAccount){
  //       await updatePrivSeed('1');
  //       const idc = await getIdentityCommitment();
  //       console.log('this is idc', idc)
  //       setIdc(idc);
  //     }
  //   };
  //   updateAndFetch();
  // }, [currentAccount]);

  
  
  
  async function handleOnClick(){
    console.log("clicked");
    await connectSnap();
    await connectMetaMask();
  }

  // await updatePrivSeed('1');
  // const idc = await getIdentityCommitment();
  // console.log("idc", idc);
  // setIdc(idc);

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

