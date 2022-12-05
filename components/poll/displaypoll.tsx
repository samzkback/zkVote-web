import Link from "next/link";
import { queryGroupPoll } from "../../utils/thegraph";

export default function DisplayPoll(props:any) {
    const {groupId } = props;
    console.log("group is ahahah ", groupId)

  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <p className='font-mono text-lg font-bold'>Polls</p>
      <div className="flex justify-center mt-2">
        {/* {polls.map((poll: any) => (
            <Link href={`/poll/${poll.id}`}>
            <div key={poll.id} className="flex flex-row border border-black border-2 px-48 py-4">
                <p className='font-mono text-lg font-bold mr-4'>{poll.id}</p>
                <p className='font-mono text-lg font-bold mr-4'> | </p>
                <p className='font-mono text-lg font-bold'>{poll.title}</p>
            </div>
            </Link>
        ))} */}

      </div>

          
             
  </div> 


        
        </>
    )
    
}
