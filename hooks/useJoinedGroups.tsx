import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";
import { useWalletConnect } from "./useWalletConnect";
import { useSnapConnect } from "./useSnapInstalled";
import { useIdc } from "./useIdc";
import { queryJoinedGroup } from "../utils/thegraph";
import { useAllGroupInfo } from "./useAllGroupInfo";

export function useJoinedGroups(){
    const[joinedGroupId, setJoinedGroupId] = useState<any>();
    const[joinedGroup, setJoinedGroup] = useState<any>();
    const isWalletConnected = useWalletConnect();
    const isSnapInstalled = useSnapConnect();
    const idc = useIdc(isWalletConnected, isSnapInstalled);
    const allGroups = useAllGroupInfo();

    useEffect(() => {
        if(idc){
            const fetchJoinedGroups = async () => {
                const joinedGroups = await queryJoinedGroup(idc);
                const groupIds = joinedGroups.map((group:any) => group.groupId);
                setJoinedGroupId(groupIds);
            }
            fetchJoinedGroups();
        }
    }, [idc, allGroups]);

    useEffect(() => {
        if(joinedGroupId && allGroups){
            const joinedGroups = allGroups.filter((group:any) => joinedGroupId.includes(group.groupId.toString()));
        setJoinedGroup(joinedGroups);
        }
    }, [joinedGroupId, allGroups]);

    useEffect(() => {
    }, [joinedGroup]);

  return joinedGroup;
}
