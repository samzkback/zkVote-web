

import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed } from "../utils/vote";
const Home: NextPage = () => {
  const [group, setGroup] = useState<any>();
  const [idc , setIdc] = useState<any>();
  useEffect(() => {
    const updateAndFetch = async () => {
    await updatePrivSeed('1');
    const idc = await getIdentityCommitment();
    console.log('this is idc', idc)
    setIdc(idc);
    const group = await groupAdminInfo();
    setGroup(group);
    console.log("group", group);
    };
    updateAndFetch();
    }, []);

  useEffect(() => {
  }, [idc]);

  return (
    <>
    <div className="flex h-full ">
      <h1>Hey Whats Up</h1>
    </div>
       

    </>
  );
};

export default Home;
