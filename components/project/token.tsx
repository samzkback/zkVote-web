
import {useState, useEffect} from 'react';
const TokenSetup = ({ register }: {register: any} ) => {

  return (
    <>
    <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
      <p className='font-mono text-lg font-bold'>Setup required token for joining</p>
      <div className="flex justify-center mt-2">
        <input
          placeholder='Import Token Contract Address...'
          type="text"
          id="projectName"
          className="w-full text-lg border border-2 border-black font-mono placeholder:text-lg placeholder:italic py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("projectName")}
        />
      </div>

    </div>

        
        </>
    )
    
}

export default TokenSetup