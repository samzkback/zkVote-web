import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT } from "../utils/vote";

export function useSpecificGroupInfo(group:any,id:any){
    const spGroup = group.filter((g:any) => g.groupId == id);
    console.log("spGroup is", spGroup)
  return spGroup[0];
}
