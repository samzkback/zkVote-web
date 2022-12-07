import Link from "next/link";
import { queryGroupPoll } from "../../utils/thegraph";
import { useState, useEffect } from "react";

export default function DisplayPoll(props:any) {
    const {groupId } = props;
    const [polls, setPolls] = useState<any>([]);
    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await queryGroupPoll(groupId);
            setPolls(polls);
        }
        fetchPolls();
    }, [groupId]);
    useEffect(() => {
    }, [polls]);


  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <p className='font-mono text-lg font-bold'>Polls</p>
      <div className="flex flex-col justify-center mt-2">
        {polls && polls.map((poll: any) => (
            <Link href={`/${groupId}/${poll.pollId}`}>
            <div key={poll.id} className="mb-4 flex flex-row border border-black border-2 px-48 py-4">
                <p className='font-mono text-lg font-bold mr-4'>{poll.pollId}</p>
                <p className='font-mono text-lg font-bold mr-4'> | </p>
                <p className='font-mono text-lg font-bold'>{poll.title}</p>
            </div>
            </Link>
        ))}

      </div>

          
             
  </div> 


        
        </>
    )
    
}
