import React, {useState, useEffect} from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPageV2 from '../../../components/layout/mainpagev2';
import Link from 'next/link';
import DisplayPollContent from '../../../components/poll/displaypollcontent';
import { queryGroupPoll } from "../../../utils/thegraph";
import DisplayPollStats from '../../../components/poll/displaypollstats';

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
        if(polls && polls.length>0){
        const poll = polls.filter((p:any) => p.pollId == pollId);
        setPoll(poll[0]);
        }

    }, [polls]);
    useEffect(() => {
    }, [poll]);

   
  return (
    <>
    
   <MainPageV2 >
    {poll &&
    <>
    <DisplayPollContent groupId={numId} poll={poll} />
    <div className='mt-10'>
    <DisplayPollStats groupId={numId} poll={poll} />
    </div>
    </>
    }
   </MainPageV2>
        
    </>
  );
}