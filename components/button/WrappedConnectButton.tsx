import React, { use, useContext, useEffect } from 'react';
import { connectSnap } from '../../utils/snap';
import { getIdentityCommitment, getVoteContract, updatePrivSeed } from '../../utils/vote';
import { useState } from 'react';
import { WalletContext } from '../../contexts/WalletContext';
import {useWalletConnect} from '../../hooks/useWalletConnect';
import { getSnap } from '../../utils/snap';
import { MetaMaskContext, MetamaskActions } from '../../contexts/MetamaskContext';
import { useSnapConnect } from '../../hooks/useSnapInstalled';
import { useIdc } from '../../hooks/useIdc';
export default function WrappedConnectButton () {
  const isWalletConnected = useWalletConnect();
  const isSnapInstalled = useSnapConnect();
  const idc = useIdc(isWalletConnected, isSnapInstalled);
  
  const connectMetaMask = async () => {
    try{
      const {ethereum } = window;
      if(!ethereum){
        alert("Please install metamask");
        return;
      }
      await ethereum.request({method: 'eth_requestAccounts'});
      getVoteContract()
    } catch (error) {
      console.log(error);
    }
  }

  const [state, dispatch] = useContext(MetaMaskContext);

  async function handleOnClick(){
    try{
      const res = await connectSnap();
      await connectMetaMask();
      const installedSnap = await getSnap();
      console.log("installedSnap", installedSnap);
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });

    }catch(e){
      console.log(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });

    }
  
  }

  useEffect(() => {
  }, [idc]);
  return (
    <>
    {idc ? <button className='w-40 border border-black border-1 px-4 py-2 rounded-3xl bg-[#5FFF37]'><p className='trucate font-mono'  style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{idc}</p></button> : 
  <button onClick={handleOnClick}><img className='h-10'src='/nav/connect.png'/></button>}
    </>);

};

