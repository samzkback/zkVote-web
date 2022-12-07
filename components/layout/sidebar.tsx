import Link from 'next/link';
import React, { useEffect } from 'react';
import{useState } from 'react';
import Item from './sideitem';
import {useJoinedGroups } from '../../hooks/useJoinedGroups'
import GroupItem from './groupitem';
type Props = {
    children: React.ReactNode;
  };
export default function SideBar() {
    const joinedGroup = useJoinedGroups();
    const explore = {
        id: '0',
        title: 'Explore',
        icon: '/icons/explore.png',
        link: '/explore'
    }
    const create = {
        id: '0',
        title: 'Explore',
        icon: '/icons/create.png',
        link: '/create'
    }
    return (
        <>
        <Item item={explore} />
        {joinedGroup && joinedGroup.map((item:any) => (
            <Link href={`/${item.groupId.toString()}`}>
            <div key={item.groupId}>
                <GroupItem item={item} />
            </div>
            </Link>
        ))}
        <Item item={create} />
        
        </>
    );
}