import React, { use, useEffect } from 'react';
import { connectSnap } from '../../utils/snap';
import { getIdentityCommitment } from '../../utils/vote';
import { useState } from 'react';

export default function WrappedConnectButton () {
  const [idc, setIdc] = useState<any>('');
  useEffect(() => {
  }, [idc]);

  async function handleOnClick(){
    console.log("clicked");
    await connectSnap();
    const idc = await getIdentityCommitment();
    console.log("idc", idc);
    setIdc(idc);
  }
  return (
    <>
    {idc!=''? <button className='w-40 border border-black border-1 px-4 py-2 rounded-3xl bg-[#5FFF37]'><p className='trucate' style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{idc}</p></button> : 
  <button onClick={handleOnClick}><img className='h-10'src='/nav/connect.png'/></button>}
    </>);

};

