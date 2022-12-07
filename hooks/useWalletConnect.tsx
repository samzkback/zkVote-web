import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";
declare const window: any;

export function useWalletConnect(){
    //this is a hook that returns true if the user has a wallet connected
    const [walletConnected, setWalletConnected] = useState(false);
    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
          if (window.ethereum.selectedAddress) {
            setWalletConnected(true);
          } else {
            setWalletConnected(false);
          }
        } else {
          setWalletConnected(false);
        }
    }, []);
    return walletConnected;

  
}
