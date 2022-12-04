import { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import DatePicker from "react-datepicker";

interface CreateProjectFormInputs {
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

const PollForm:React.FC<{
    supervisors:string[], 
    register: UseFormRegister<CreateProjectFormInputs>,

    setElemAtIndex: (index: number, event: ChangeEvent<HTMLInputElement>,formKey: keyof CreateProjectFormInputs,formVal: string[] ) => void,
    removeElemAtIndex: (index: number, event: any, formKey: keyof CreateProjectFormInputs, formVal: string[]) => void,
    addNewElem: (event: any, formKey: keyof CreateProjectFormInputs,formVal: string[]) => void
    }>= ({register, supervisors, setElemAtIndex, removeElemAtIndex, addNewElem}) => (

    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <p className='font-mono text-lg font-bold'>Title*</p>
      <div className="flex justify-center mt-2">
        <input
          type="text"
          id="projectName"
          className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("projectName")}
        />
      </div>

  <p className='font-mono text-lg font-bold mt-2'>Description</p>
  <div className="mt-2 flex justify-center">
    <textarea
      rows={5}
      id="description"
      className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
      {...register("projectDescription")}
    />
  </div>   
  

  <p className='font-mono text-lg font-bold'>Choices*</p>




      <table className=" flex justify-center">
  <tbody>
    {supervisors.map((supervisor, idx) => (
      <tr key={idx}>
        <td>
          <div className="flex mt-2">
            <input
              type="text"
              name="stake"
              id="stake"
              value={supervisor}
              className="text-[#4A2222] text-lg font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block max-w-lg w-full bg-white rounded-l-xl border-r-0 focus:ring-indigo-500 focus:border-indigo-500  border border-black border-2"
              onChange={(e) =>
                setElemAtIndex(
                  idx,
                  e,
                  "supervisors",
                  supervisors
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
                    "supervisors",
                    supervisors
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
            addNewElem(e, "supervisors", supervisors)
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
<input
          type="text"
          id="projectName"
          className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("projectName")}
        /> 
        <p className="mt-4 mx-4">To</p>
  <input
          type="text"
          id="projectName"
          className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("projectName")}
        /> 
</div>

<button>
    <img className=" mt-4 mr-4" src="/create/publish.png" />
</button>
<button>
    <img className=" mt-4" src="/create/cancel.png" />
</button>


  </div> 


        
        </>

    
    )

export default PollForm