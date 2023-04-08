import React from 'react';
import Image from 'next/image'
import SidebarItem from './sidebar-item'

function Sidebar(props) {
    return (
        <div className='flex flex-col h-screen w-[280px] border-r border-slate-200 px-5 py-5'>
            <div className='flex items-center mt-3 mb-10'>
                <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                <p className='font-bold ms-2'>PT.Deltomed</p>
            </div>
            <ul>
                <SidebarItem icon="dashboard" title="Dashboard" link="/" />
            </ul>
            <div className='mt-3 mb-3 text-slate-600 tracking-wider text-sm'>
                Master
            </div>
            <ul>
                <SidebarItem icon="group_work" title="Divisi" link="division" />
                <SidebarItem icon="location_searching" title="Lokasi" />
                <SidebarItem icon="account_circle" title="Pengguna" />
            </ul>
            <div className='mt-3 mb-3 text-slate-600 tracking-wider text-sm'>
                Transactions
            </div>
            <ul>
                <SidebarItem icon="confirmation_number" title="Pengaduan" />
            </ul>
            <div className='mt-3 mb-3 text-slate-600 tracking-wider text-sm'>
                Reports
            </div>
        </div>
    );
}

export default Sidebar;