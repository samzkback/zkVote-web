import Link from 'next/link';
import React, { useEffect } from 'react';
import{useState } from 'react';
import Item from './sideitem';

export default function SideBar() {
    const [items, setItems] = useState<any>([]);
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
    const tempItems = [
        {
            id: '1',
            title: 'ApeCoin DAO',
            icon: 'https://s2.loli.net/2022/12/03/ojIKC4fVxFNp8rB.png',
            link: '/1',
        },
        {
            id: '2',
            title: 'JuiceboxDAO',
            icon: 'https://s2.loli.net/2022/12/03/fJgCGTadINuh6pq.png',
            link: '/2',
        },
        {
            id: '3',
            title: 'CabinDAO',
            icon: 'https://s2.loli.net/2022/12/03/xCMjeUfHzK5Wbsc.png',
            link: '/3',
        },
    ];
    

    useEffect(()=>{
        setItems(tempItems)
    },[])

    return (
        <>
        <Item item={explore} />
        {items.map((item:any) => (
            <div key={item.id}>
                <Item item={item} />
            </div>
        ))}
        <Item item={create} />
        
        </>
    );
}