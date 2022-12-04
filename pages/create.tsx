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
import { useEffect } from 'react';
export interface CreateGroupFormInputs {
    tokenAddress: string;
    visibility: string;
    groupName: string;
    groupDescription: string;
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
      } = useForm<CreateGroupFormInputs>({
        defaultValues: {
          tokenAddress: "",
          visibility: "public",
          groupName: "",
          groupDescription: "",
          image: undefined,    
        },
      });
    
    const [preview, setPreview] = useState<string>();
    const image = watch("image");

    useEffect(() => {
        if (image! && image![0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setPreview(reader.result as string);
          };
          reader.readAsDataURL(image[0]);
        }
      }, [image]);

    const renderFn = (step:number) => {
        switch(step) {
          case 0:
            return <Details register={register} preview={preview} />;
          case 1:
            return <Visibility register={register} />;
          case 2:
            return <TokenSetup register={register} />;

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