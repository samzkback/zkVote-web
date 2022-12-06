import React, {useEffect, useState}from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../components/layout/mainpage';
import SidePage from '../../components/layout/grouppage';
import GroupPage from '../../components/layout/grouppage';
import Link from 'next/link';
import DisplayPoll from '../../components/poll/displaypoll';
import { useAllGroupInfo } from '../../hooks/useAllGroupInfo';
import { useSpecificGroupInfo } from '../../hooks/useSpecificGroupInfo';

const { Title } = Typography;
export async function getServerSideProps(context:any) {
    const { group } = context.query;
    return {
        props: { group }
    }
}

export default function GroupHome(props:any) {

    const [groupId, setGroupId] = useState<any>(props.group);
    const allGroup = useAllGroupInfo();
    const [currentGroup, setCurrentGroup] = useState<any>();
    useEffect(() => {
        if(allGroup){
            const currentGroup = useSpecificGroupInfo(allGroup, groupId);
            setCurrentGroup(currentGroup);
        }
    }, [allGroup]);
    useEffect(() => {
        console.log("group id is ", groupId)
    }, [groupId]);

  return (
    <>
    {currentGroup && 
   <GroupPage item={currentGroup} >
    <Link href={`/${currentGroup.groupId}/newpoll`}>
    <button className='mt-6'>
    <img src='/create/button1.png'/>
    </button>
    </Link>
    <DisplayPoll groupId={currentGroup.groupId} />
   </GroupPage>
   }
        
    </>
  );
}