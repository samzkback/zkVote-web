import React, {useEffect, useState}from 'react';
import MainPage from '../../components/layout/mainpage';
import { useRouter } from 'next/router';
import { useAllGroupInfo } from '../../hooks/useAllGroupInfo';
import { useSpecificGroupInfo } from '../../hooks/useSpecificGroupInfo';
import { mint_nft } from '../../utils/vote';
export async function getServerSideProps(context:any) {
    const { group } = context.query;
    return {
        props: { group }
    }
}


export default function Join(props:any) {
    const groupId = props.group;
    const allGroup = useAllGroupInfo();
    const [currentGroup, setCurrentGroup] = useState<any>();
    useEffect(() => {
        if(allGroup){
            const currentGroup = useSpecificGroupInfo(allGroup, groupId);
            setCurrentGroup(currentGroup);
        }
    }, [allGroup]);
    
    
  return (
    <MainPage>
        {currentGroup && 
        <>
        <h1 className="text-2xl text-md mb-3 ">Join/{currentGroup.name}</h1>

        <div className='flex flex-col justify-center'>
        <img className='w-2/12 rounded-full mt-10 mx-auto' src={currentGroup.icon}></img>
        <div className='mx-auto'>
            <p className='font-mono text-lg my-10'>You need to have an NFT to join the group, you can mint it now!</p>
        </div>
        <button onClick={()=>mint_nft(currentGroup.asset)} className=" py-4 mt-2 bg-white border border-1 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Mint NFT</button>

        </div>
        </>
        }

    </MainPage>
  );
}

