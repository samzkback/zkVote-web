import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";
declare const window: any;
import { getSnap } from '../utils/snap';

export function useSnapConnect(){
    const [snapConnected, setSnapConnected] = useState(false);
    useEffect(() => {
        const checkSnap = async () => {
            const snap = await getSnap();
            console.log("snappppp", snap)
            if (snap) {
                setSnapConnected(true);
            } else {
                setSnapConnected(false);
            }
        }
        checkSnap();
    }, []);
    
    return snapConnected;

  
}
