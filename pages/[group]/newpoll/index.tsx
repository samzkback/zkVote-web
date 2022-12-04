import React from "react";
import { ChangeEvent } from "react";
// import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../../components/layout/mainpage';
import { useRouter } from 'next/router';
import PollForm from "../../../components/poll/pollform";
import {useForm, SubmitHandler } from "react-hook-form";

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
const { Title } = Typography;
export default function NewPoll(props:any) {
    const router = useRouter();
    const itemId = router.query.group;

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
      const setElemAtIndex = (
        index: number,
        event: ChangeEvent<HTMLInputElement>,
        formKey: keyof CreateProjectFormInputs,
        formVal: string[]
      ) => {
        setValue(formKey, [
          ...formVal.slice(0, index),
          event.target.value,
          ...formVal.slice(index + 1),
        ]);
      };
      const removeElemAtIndex = (
        index: number,
        event: any,
        formKey: keyof CreateProjectFormInputs,
        formVal: string[]
      ) => {
        event.preventDefault();
        setValue(
          formKey,
          formVal.filter((e, i) => i !== index)
        );
      };
      const addNewElem = (
        event: any,
        formKey: keyof CreateProjectFormInputs,
        formVal: string[]
      ) => {
        event.preventDefault();
        setValue(formKey, [...formVal, ""]);
      };
      const supervisors = watch("supervisors");
  return (
    <MainPage>
      <h1 className="text-2xl text-md mb-3 ">{itemId}/New Poll/</h1>
      <PollForm register={register}  supervisors={supervisors} setElemAtIndex={setElemAtIndex} removeElemAtIndex={removeElemAtIndex} addNewElem={addNewElem}/>

    </MainPage>
  );
}