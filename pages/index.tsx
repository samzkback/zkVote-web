import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed } from "../utils/vote";
import { useWalletConnect } from "../hooks/useWalletConnect";
const Home: NextPage = () => {
  const [group, setGroup] = useState<any>();
  return (
    <>
    <div className="flex h-full ">
      <h1>Hey Whats Up</h1>
    </div>
    </>
  );
};

export default Home;
