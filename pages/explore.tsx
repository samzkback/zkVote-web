import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../components/layout/mainpage';
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT, mint_nft } from "../utils/vote";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WalletContext } from '../contexts/WalletContext';
const { Title } = Typography;
declare const window: any;
export default function Explore() {
const [group, setGroup] = useState<any>();
const [idc , setIdc] = useState<any>();
const [walletConnected, setWalletConnected] = useState(false);
const router = useRouter();
const { address, isSnapInstalled } = useContext(WalletContext)
console.log('cur', isSnapInstalled)



useEffect(() => {
console.log('cur', isSnapInstalled)

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Check if accounts are already available
      if (window.ethereum.selectedAddress) {
        // Accounts are already available, set the walletConnected state to true
        setWalletConnected(true);
      } else {
        // Accounts are not available, set the walletConnected state to false
        setWalletConnected(false);
      }
    } else {
      // MetaMask is not installed, set the walletConnected state to false
      setWalletConnected(false);
    }
  }, []);

// This effect will run only when the walletConnected state changes
useEffect(() => {
    console.log("updating", address, isSnapInstalled)
  // Check if the wallet is connected
  if (address && isSnapInstalled) {
    const updateAndFetch = async () => {
      await updatePrivSeed('1');
      const idc = await getIdentityCommitment();
      console.log("im the idc", idc)
      setIdc(idc);
    //   const group = await groupAdminInfo();
    //   setGroup(group);
    //   console.log("group", group);
    };
    updateAndFetch();
  }
}, [address, isSnapInstalled]);

useEffect(() => {
    console.log(group)
}, [group]);

useEffect(() => {
    console.log("<33333")
    console.log("idc", idc)
    console.log("group", group)
    if(idc){
        const fetchGroup = async () => {
            const group = await groupAdminInfo();
            setGroup(group);
            console.log("group", group);
        }
        fetchGroup();
    }


}, [idc]);

console.log("is wallet connected", walletConnected);



async function handleOnClick(groupId:any, idc:any, tokenAddress:string) {
        console.log("checking if user has NFT");
        console.log("token address", tokenAddress);
        const checkNFT = await hasNFT(tokenAddress);
        const userHasNFT = (checkNFT.toNumber()>0)
        console.log("hasNFT", userHasNFT);
        if(!userHasNFT){
            console.log("user does not have NFT");
            router.push(`/${groupId}/mint`)
        }else{
            await addMember(groupId,idc);
            router.push(`/${groupId}`)
        }

      }
  return (
    <MainPage>
      <h1 className="text-2xl text-md mb-3 ">Explore/</h1>
        <div className="grid gap-4 grid-cols-3 pt-10">
            {idc && group && group.map((item:any) => (
            <div key={item.groupId}>
                 <Row gutter={0}>
                    <Col span={24}>
                        <Link href={`/${item.groupId}`}>
                        <Card bordered={false} className='p-4 m-0 flex flex-col justify-center object-center text-center items-center' >
                            <div className='flex-col'>
                               <img src={item.icon? item.icon :  '/icons/step3.png'} className='rounded-full' width={90}/>
                               <p className='text-lg font-bold'>{item.name}</p>
                               <p className='text-sm text-gray-500'>{item.members.length} members</p>
                               <p className='text-sm text-[#5FFF37]'>{item.onGoing} votes ongoing</p>
                               {item.members.includes(idc)?
                                    <button className="mt-4 bg-[#A073FF] text-white font-normal py-2 px-8 rounded-full">Joined</button> :
                                    <button onClick={()=> handleOnClick(item.groupId, idc, item.asset)} className=" mt-4 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Join+</button>
                                }
                            </div>
                        </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
            ))}
        </div>
    </MainPage>
  );
}