import React, { use } from "react";
import { ChangeEvent } from "react";
// import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import MainPage from '../../../components/layout/mainpage';
import { useRouter } from 'next/router';
import PollForm from "../../../components/poll/pollform";
import {useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

export interface CreatePollFormInputs {
    choices: string[];
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }
const { Title } = Typography;
export default function NewPoll(props:any) {
    const router = useRouter();
    const groupId:string = router.query.group!.toString();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<CreatePollFormInputs>({
        defaultValues: {
          choices: [""],
          title: "",
          description: "",
          startDate: new Date(),   
          endDate:  new Date(),   
        },
      });
      const setElemAtIndex = (
        index: number,
        event: ChangeEvent<HTMLInputElement>,
        formKey: keyof CreatePollFormInputs,
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
        formKey: keyof CreatePollFormInputs,
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
        formKey: keyof CreatePollFormInputs,
        formVal: string[]
      ) => {
        event.preventDefault();
        setValue(formKey, [...formVal, ""]);
      };
      const choices= watch("choices");
      const title = watch("title");
      const startDate = watch("startDate");
      const endDate = watch("endDate");
      const description = watch("description");
      useEffect (() => {
        console.log('yo');
        console.log(getValues("startDate"));
        console.log(getValues("endDate"));
        console.log(getValues("choices"));
        console.log(getValues("title"));
        console.log(getValues("description"));
      }, [startDate, endDate, choices, title, description]);


  return (
    <MainPage>
      <h1 className="text-2xl text-md mb-3 ">{groupId}/New Poll/</h1>
      <PollForm groupId={groupId} setValue={setValue} startDate={startDate} endDate={endDate} register={register}  choices={choices} setElemAtIndex={setElemAtIndex} removeElemAtIndex={removeElemAtIndex} addNewElem={addNewElem}/>

    </MainPage>
  );
}