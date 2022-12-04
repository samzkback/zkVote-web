import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../components/layout/mainpage';
import SidePage from '../../components/layout/grouppage';
import GroupPage from '../../components/layout/grouppage';
import Link from 'next/link';
import DisplayPoll from '../../components/poll/displaypoll';
const { Title } = Typography;
export default function Explore() {
    const item= 
        {
            id: '1',
            title: 'ApeCoin DAO',
            icon: 'https://s2.loli.net/2022/12/03/ojIKC4fVxFNp8rB.png',
            members: '8.9k',
            onGoing: 2,
            link: '/1',
        }

    const polls=[{
        id:'1',
        title:'Throwing a virtual music festival',
        description:'I am writing to propose a metaverse music festival to be hosted by your DAO. A virtual music festival is a great way to bring your community together, while also exposing your brand to a wider audience. The concept of a metaverse music festival allows us to create an immersive and interactive experience that can be accessed from anywhere in the world. ',
        choices:[
            {
                id:'1',
                description:'Sure LFG!!'
            },
            {
                id:'2',
                description:'Actually...Nope.'
            }
        ]

    }]

  return (
    <>
    
   <GroupPage item={item} >
    <Link href={`/${item.id}/newpoll`}>
    <button className='mt-6'>
    <img src='/create/button1.png'/>
    </button>
    </Link>
    <DisplayPoll polls={polls} />
   </GroupPage>
        
    </>
  );
}