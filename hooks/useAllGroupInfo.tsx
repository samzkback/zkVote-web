import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";

export function useAllGroupInfo(){
    const[group, setGroup] = useState<any>();
    useEffect(() => {
        const fetchGroup = async () => {
            const group = await groupAdminInfo();
            setGroup(group);
        }
        fetchGroup();
    }, []);
    useEffect(() => {
    }, [group]);

  return group;
}
