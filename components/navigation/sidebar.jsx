import React from 'react';
import Image from 'next/image'

function Sidebar(props) {
    return (
        <div className='flex flex-col h-screen w-[300px] border-r border-slate-200 px-5 py-5'>
            <div className='flex items-center mt-3 mb-10'>
                <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                <p className='font-bold ms-1'>PT.Deltomed</p>
            </div>
            <div className='mb-3 text-slate-600'>
                Main Menu
            </div>
            <ul className='pl-2'>
                <li className='flex'>
                    <span class="material-symbols-outlined text-slate-600">
                        dashboard
                    </span>
                    <a href='' className='ms-2 text-slate-600'>Dashboard</a>
                </li>
                <li className='flex'>
                    <span class="material-symbols-outlined text-slate-600">
                        group_work
                    </span>
                    <a href='' className='ms-2 text-slate-600'>Divisi</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;