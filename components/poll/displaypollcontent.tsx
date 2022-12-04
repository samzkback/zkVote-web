import Link from "next/link";
export default function DisplayPollContent(props:any) {
    const {polls } = props;

  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <div className="flex flex-col mt-2">
        {polls.map((poll: any) => (
            <div key={poll.id} className="flex flex-col px-10 py-4">

                <p className='font-mono text-3xl font-bold mb-4'>{poll.title}</p>
                <p className='font-mono text-lg font-bold mb-4'>{poll.description}</p>
                {poll.choices.map((choice: any) => (
                    <div key={choice.id} className="flex flex-row border border-black border-2 px-48 py-4 mb-4">
                        <p className='font-mono text-lg font-bold mr-4'>{choice.id}</p>
                        <p className='font-mono text-lg font-bold mr-4'> | </p>
                        <p className='font-mono text-lg font-bold'>{choice.description}</p>
                    </div>
                ))}
            </div>
        ))}
            <button>
                <img className="mx-auto w-1/2" src={'/vote/vote.png'} />
            </button>



      </div>

          
             
  </div> 


        
        </>
    )
    
}
