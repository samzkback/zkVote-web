import React from 'react';
import { Breadcrumb, Layout, Menu} from 'antd';
import CreationSteps from '../components/group/steps';
const { Header, Content, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../components/layout/mainpage';
import { useState } from 'react';
import Details from '../components/group/details';
const { Title } = Typography;
import { useForm, SubmitHandler } from "react-hook-form";
import Visibility from '../components/group/visibility';
import TokenSetup from '../components/group/token';

export interface CreateProjectFormInputs {
    supervisors: string[];
    stakeAmount: string;
    unreturnedStakeBeneficiaries: string[];
    returnWindowDays: string;
    maxParticipants: string;
    shouldParticipantsShareUnreturnedStake: boolean;
    shouldUseSupervisorInactionGuard: boolean;
    projectName: string;
    projectDescription: string;
    image: any;
  }
export default function Explore() {
    const [step, setStep] = useState(0);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<CreateProjectFormInputs>({
        defaultValues: {
          supervisors: [""],
          stakeAmount: "0.05",
          unreturnedStakeBeneficiaries: [],
          returnWindowDays: "30",
          maxParticipants: "100",
          shouldParticipantsShareUnreturnedStake: false,
          shouldUseSupervisorInactionGuard: true,
          projectName: "",
          projectDescription: "",
          image: undefined,    
        },
      });
    
    const [preview, setPreview] = useState<string>();

    const renderFn = (step:number) => {
        switch(step) {
          case 0:
            return <Details register={register} preview={preview} />;
          case 1:
            return <Visibility register={register} />;
          case 2:
            return <TokenSetup register={register} />;
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
        <div className="pt-10 px-52">
        <CreationSteps step={step} setStep={setStep}/>
        </div>
        {renderFn(step)}
        </MainPage>
    );
}