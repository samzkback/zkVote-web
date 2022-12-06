import React, {useState, useEffect} from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../../components/layout/mainpage';
import Link from 'next/link';
import DisplayPollContent from '../../../components/poll/displaypollcontent';
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember, hasNFT, mint_nft } from "../../../utils/vote";
import { queryGroupPoll } from "../../../utils/thegraph";

const { Title } = Typography;

export async function getServerSideProps(context:any) {
    const { group, poll } = context.query;
    return {
        props: { group, poll}
    }
}

export default function Poll(props:any) {
    const groupId = props.group;
    const numId = parseInt(groupId);
    const pollId = props.poll;
    console.log("group id is ishifh", groupId)
    console.log("poll id is ishifh", pollId)
    const [polls, setPolls] = useState<any>([]);
    const [poll, setPoll] = useState<any>([]);

    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await queryGroupPoll(numId);
            setPolls(polls);
        }
        fetchPolls();
    }, [groupId]);

    useEffect(() => {
        console.log("polls are ", polls);
        if(polls && polls.length>0){
        const poll = polls.filter((p:any) => p.pollId == pollId);
        setPoll(poll[0]);
        console.log("poll is <333333", poll);
        }

    }, [polls]);
    useEffect(() => {
    }, [poll]);

   
  return (
    <>
    
   <MainPage  >
    {poll &&
    <DisplayPollContent groupId={numId} poll={poll} />
    }
   </MainPage>
        
    </>
  );
}