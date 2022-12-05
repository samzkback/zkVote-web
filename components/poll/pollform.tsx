import { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

interface CreatePollFormInputs {
    choices: string[];
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }

const PollForm:React.FC<{
    groupId: string;
    setValue: UseFormSetValue<CreatePollFormInputs>;
    startDate: any;
    endDate: any;
    choices:string[], 
    register: UseFormRegister<CreatePollFormInputs>,
    setElemAtIndex: (index: number, event: ChangeEvent<HTMLInputElement>,formKey: keyof CreatePollFormInputs,formVal: string[] ) => void,
    removeElemAtIndex: (index: number, event: any, formKey: keyof CreatePollFormInputs, formVal: string[]) => void,
    addNewElem: (event: any, formKey: keyof CreatePollFormInputs,formVal: string[]) => void,
    }>= ({groupId, setValue, startDate, endDate, choices, register, setElemAtIndex, removeElemAtIndex, addNewElem}) => (

    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <p className='font-mono text-lg font-bold'>Title*</p>
      <div className="flex justify-center mt-2">
        <input
          type="text"
          id="projectName"
          className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("title")}
        />
      </div>

  <p className='font-mono text-lg font-bold mt-2'>Description</p>
  <div className="mt-2 flex justify-center">
    <textarea
      rows={5}
      id="description"
      className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
      {...register("description")}
    />
  </div>   
  

  <p className='font-mono text-lg font-bold'>Choices*</p>
      <table className=" flex justify-center">
  <tbody>
    {choices.map((choice, idx) => (
      <tr key={idx}>
        <td>
          <div className="flex mt-2">
            <input
              type="text"
              name="stake"
              id="stake"
              value={choice}
              className="text-[#4A2222] text-lg font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-white rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border border-black border-2"
              onChange={(e) =>
                setElemAtIndex(
                  idx,
                  e,
                  "choices",
                  choices
                )
              }
            />

            <span className="font-bold text-black inline-flex items-center text-lg  bg-white border border-2 border-black rounded-r-xl border-l-0  ">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={(e) =>
                  removeElemAtIndex(
                    idx,
                    e,
                    "choices",
                    choices
                  )
                }
              >
                <img
                  className="h-10 w-10 mx-4 mr-8 my-2"
                  src="/create/minus.png"
                />
              </button>
            </span>
          </div>
        </td>
      </tr>
    ))}
    <tr>
      <td className="">
        <button
          onClick={(e) =>
            addNewElem(e, "choices", choices)
          }
        >
          <img
            className="h-10 w-10 mt-4"
            src="/create/plus.png"
          />
        </button>
      </td>
    </tr>
  </tbody>
</table>


<p className='font-mono text-lg font-bold mt-2'>Voting Period</p>
<div className="flex justify-center mt-2">
<DatePicker
value={startDate}
    id= "startDate"
    selected={startDate}
    onChange={(date: any) => setValue("startDate", date)}
    className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
    // {...register("startDate")}
/>

<p className="mt-4 mx-4">To</p>

<DatePicker
    id= "endDate"
    selected={endDate}
    onChange={(date: any) => setValue("endDate", date)}
    className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
    // {...register("endDate")}
/>

</div>

<button>
    <img className=" mt-4 mr-4" src="/create/publish.png" />
</button>
<Link href={`/${groupId}`}>
<button>
    <img className=" mt-4" src="/create/cancel.png" />
</button>
</Link>


  </div> 


        
        </>

    
    )

export default PollForm