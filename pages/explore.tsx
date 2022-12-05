import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../components/layout/mainpage';
import { getIdentityCommitment, groupAdminInfo, updatePrivSeed, addMember } from "../utils/vote";
import Link from 'next/link';
const { Title } = Typography;
export default function Explore() {
    const [group, setGroup] = useState<any>();
    const [idc , setIdc] = useState<any>();

    useEffect(() => {
        const updateAndFetch = async () => {
        await updatePrivSeed('1');
        const idc = await getIdentityCommitment();
        setIdc(idc);
        const group = await groupAdminInfo();
        setGroup(group);
        console.log("group", group);
        };
        updateAndFetch();
    }, []);
    useEffect(() => {
    }, [group]);

  return (
    <MainPage>
      <h1 className="text-2xl text-md mb-3 ">Explore/</h1>
        <div className="grid gap-4 grid-cols-3 pt-10">
            {group && group.map((item:any) => (
            <div key={item.groupId}>
                 <Row gutter={0}>
                    <Col span={24}>
                        <Card bordered={false} className='p-4 m-0 flex flex-col justify-center object-center text-center items-center' >
                            <div className='flex-col'>
                               <img src={item.icon? item.icon :  '/icons/step3.png'} className='rounded-full' width={90}/>
                               <p className='text-lg font-bold'>{item.name}</p>
                               <p className='text-sm text-gray-500'>{item.members.length} members</p>
                               <p className='text-sm text-[#5FFF37]'>{item.onGoing} votes ongoing</p>
                               <button onClick={() => addMember(item.groupId, idc)} className=" mt-4 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Join+</button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            ))}
        </div>
    </MainPage>
  );
}