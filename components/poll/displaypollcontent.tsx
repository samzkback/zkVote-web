import Link from "next/link";
import { useEffect, useState } from "react";
import { voteInPoll } from "../../utils/vote";
export default function DisplayPollContent(props:any) {
    const {poll,groupId } = props;
    const numPollId = parseInt(poll.pollId);
    useEffect(() => {
    }, [poll]);

    const [choice, setChoice] = useState<any>([]);
    //write a handle choice function
    const handleChoice = (c: any) => {
        setChoice(c);
    }
    useEffect(() => {
    }, [choice]);

    const submitPoll = (groupId:number, pollId:number, msg:string) => {
        voteInPoll(groupId, pollId, msg);

    }
  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <div className="flex flex-col mt-2">
            {poll && 
            <>
                <p className='font-mono text-3xl font-bold mb-4'>{poll.title}</p>
                {/* <p className='font-mono text-lg font-bold mb-4'>{poll.description}</p> */}
                {poll.voteMsgs && poll.voteMsgs.length>0 && poll.voteMsgs.map((choice: any) => (
                    <button onClick={()=>handleChoice(choice)}>
                    <button key={poll.pollId} className="flex flex-row border border-black border-2 w-full py-4 mb-4 visited:bg-violet-700 focus:ring focus:outline-none focus:ring-violet-300 hover:bg-violet-300">
                        <p className='px-10 font-mono text-lg font-bold'>{choice}</p>
                    </button>
                    </button>
                ))}
                </>
            }
    <button onClick={()=> submitPoll(groupId, numPollId, choice)}>
        <img className="mx-auto w-1/2" src={'/vote/vote.png'} />
    </button>
    </div>          
  </div> 
 </>
    )
    
}
