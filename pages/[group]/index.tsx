import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../components/layout/mainpage';

const { Title } = Typography;
export default function Explore() {
    const items = [
        {
            id: '1',
            title: 'ApeCoin DAO',
            icon: 'https://s2.loli.net/2022/12/03/ojIKC4fVxFNp8rB.png',
            members: '8.9k',
            onGoing: 2,
            link: '/1',
        },
        {
            id: '2',
            title: 'JuiceboxDAO',
            icon: 'https://s2.loli.net/2022/12/03/fJgCGTadINuh6pq.png',
            members: '2.3k',
            onGoing: 5,
            link: '/2',
        },
        {
            id: '3',
            title: 'CabinDAO',
            icon: 'https://s2.loli.net/2022/12/03/xCMjeUfHzK5Wbsc.png',
            members: '5.6k',
            onGoing: 1,
            link: '/3',
        }
    ]

  return (
    <MainPage>
      <h1 className="text-2xl text-md mb-3 ">Explore/</h1>
        <div className="grid gap-4 grid-cols-3 pt-10">
            {items.map((item:any) => (
            <div key={item.id}>
                 <Row gutter={0}>
                    <Col span={24}>
                        <Card bordered={false} className='p-4 m-0 flex flex-col justify-center object-center text-center items-center' >
                            <div className='flex-col'>
                               <img src={item.icon} />
                               <p className='text-lg font-bold'>{item.title}</p>
                               <p className='text-sm text-gray-500'>{item.members} members</p>
                               <p className='text-sm text-[#5FFF37]'>{item.onGoing} votes ongoing</p>
                               <button className=" mt-4 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Join+</button>
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