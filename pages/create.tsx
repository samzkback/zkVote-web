import React from 'react';
import { Breadcrumb, Layout, Menu} from 'antd';
import CreationSteps from '../components/project/steps';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../components/layout/mainpage';
import { useState } from 'react';
const { Title } = Typography;
export default function Explore() {
    const [step, setStep] = useState(0);
    const renderFn = (step:number) => {
        switch(step) {
          case 0:
            return <h1>Hey</h1>;
          case 1:
            return <h1>Hey</h1>;
          case 2:
            return <h1>Hey</h1>;
          case 3:
            return <h1>Hey</h1>;
          case 4:
            return <h1>Hey</h1>;

          default:
            return null;
        }
    }


    return (
        
        <MainPage>
        <h1 className="text-2xl text-md mb-3 ">Create Group/</h1>
        <div className="pt-10 px-32">
        <CreationSteps step={step} setStep={setStep}/>
        {renderFn(step)}
        </div>
        </MainPage>
    );
}