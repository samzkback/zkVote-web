import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";
declare const window: any;
import { getSnap } from '../utils/snap';

export function useIdc(isWalletConnected:boolean, isSnapInstalled:boolean){
    //return idc when wallet and snap are both connected 
    const [idc, setIdc] = useState<any>();
    useEffect(() => {
        //create an async function to check if the user has a wallet connected
        const checkIdc = async () => {
            if(isWalletConnected && isSnapInstalled){
                await updatePrivSeed('1');
                const idc = await getIdentityCommitment();
                setIdc(idc);
            }
        }
        checkIdc();
    }, [isWalletConnected, isSnapInstalled]);
    useEffect(() => {
    }, [idc]);
    
    return idc;

  
}
