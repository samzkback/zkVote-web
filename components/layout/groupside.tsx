import Link from 'next/link';
import React, { useEffect } from 'react';
import{useState } from 'react';
import Item from './sideitem';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content } = Layout;
import GroupNav from './groupnav';
import { useRouter } from 'next/router';
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT, mint_nft } from "../../utils/vote";

export default function GroupSide(props:any) {
    const { item } = props;
    const { groupId, name, icon, members, onGoing, asset} = item;

    const [group, setGroup] = useState<any>();
    const [idc , setIdc] = useState<any>();
    const router = useRouter();
    const [isMember, setIsMember] = useState<any>();

    useEffect(() => {
        const getIdc = async () => {
        const idc = await getIdentityCommitment();
        setIdc(idc);
        };
        getIdc();
    }, []);
    useEffect(() => {
        if(idc){
            members.includes(idc) ? setIsMember(true) : setIsMember(false);
        }
    }, [idc]);
    useEffect(() => {
        console.log("isMember", isMember)
    }, [isMember]);




    return (
        <>
        <Layout style={{ padding: '0 24px 24px', background: '#F3EFFB', border:'2px solid #BED7BE', borderRadius:'30px' }}>
        <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: '80vh',
              minWidth: '15vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
            <div className='justify-center text-center'>
            <img className='rounded-full' src={icon} />
            <p className='text-lg font-bold mt-5'>{name}</p>
            <p className='text-sm text-gray-500'>{members.length} members</p>
            <p className='text-sm text-[#5FFF37]'>{onGoing} votes ongoing</p>
            {isMember? <button className=" mt-2 bg-[#A073FF] text-white font-normal py-2 px-8 rounded-full">Joined</button> : <button className=" mt-2 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Join+</button> }
            {/* <button className=" mt-2 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Join+</button> */}
            <GroupNav />
            </div>
            </Content>
        </Layout>
        </>
    );
}