import Link from "next/link";
import { useEffect, useState } from "react";
import { voteInPoll, getPollVoteStat } from "../../utils/vote";
export default function DisplayPollStats(props:any) {
    const {poll,groupId } = props;
    const numPollId = parseInt(poll.pollId);
    console.log("poll is xxx", poll);
    useEffect(() => {
        console.log("poll is", poll);
    }, [poll]);

  
    const [pollStats, setPollStats] = useState([]);
    useEffect(() => {
        console.log("pollStats are", pollStats);
    }, [pollStats]);

    useEffect(() => {
      async function fetchPollStats() {
        const results = await Promise.all(poll.voteMsgs.map(async (choice: any) => {
          const stat = await getPollVoteStat(groupId, numPollId, choice);
          return { choice, stat };
        }));
  
        const allResults = [].concat(...results);
  
        setPollStats(allResults);
      }
  
      if (poll && poll.voteMsgs && poll.voteMsgs.length > 0) {
        fetchPollStats();
      }
    }, [poll, groupId, numPollId]);


  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <div className="flex flex-col mt-2">
            {pollStats && 
            <>
                <p className='font-mono text-3xl font-bold mb-4'>Current Results</p>
                {/* <p className='font-mono text-lg font-bold mb-4'>{poll.description}</p> */}
                {pollStats.map((stat: any) => (
                    <div key={poll.pollId} className="flex flex-row border border-black border-2 px-48 py-4 mb-4">
                        <p className='font-mono text-lg font-bold'>{stat.choice}:{stat.stat.toString()}</p>
                    </div>
                ))}
                </>
            }
    </div>          
  </div> 
 </>
    )
    
}
