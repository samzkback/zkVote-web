import React from 'react';
import Link from 'next/link';

export default function GroupNav(props:any) {
    return (
        <div className='mt-4'>
          <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/1.png" />
            <p className='mt-2 text-lg'>Overview</p>
          </div>
                <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/2.png" />
         <p className='mt-2 text-lg'>Ongoing Votes</p>
          </div>
                <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/3.png" />
         <p className='mt-2 text-lg'>Polls</p>
          </div>
                <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/4.png" />
         <p className='mt-2 text-lg'>Treasury</p>
          </div>
                <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/5.png" />
         <p className='mt-2 text-lg'>Members</p>
          </div>
                <div className='flex flex-row'>
            <img className='flex flex-row mr-2' src="/nav/6.png" />
         <p className='mt-2 text-lg'>Settings</p>
          </div>

        </div>
      );
}
