import React from 'react';
import Image from 'next/image'
import SidebarItem from './sidebar-item'

function Sidebar(props) {
    return (
        <div className='flex flex-col h-screen md:w-[280px] sm:w-14 border-r border-slate-200 px-5 sm:px-4 py-5 transition-all ease-in-out duration-500'>
            <div className='md:flex md:items-center md:mt-3 md:mb-10 sm:hidden'>
                <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                <p className='font-bold ms-2'>PT.Deltomed</p>
            </div>
            <ul>
                <SidebarItem icon="dashboard" title="Dashboard" link="/" />
            </ul>
            <div className='md:block mt-3 mb-3 text-slate-600 tracking-wider text-sm sm:hidden'>
                Master
            </div>
            <ul>
                <SidebarItem icon="group_work" title="Divisi" link="division" />
                <SidebarItem icon="location_searching" title="Lokasi" />
                <SidebarItem icon="account_circle" title="Pengguna" />
            </ul>
            <div className='md:block mt-3 mb-3 text-slate-600 tracking-wider text-sm sm:hidden'>
                Transactions
            </div>
            <ul>
                <SidebarItem icon="confirmation_number" title="Pengaduan" />
            </ul>
            <div className='md:block mt-3 mb-3 text-slate-600 tracking-wider text-sm sm:hidden'>
                Reports
            </div>
        </div>
    );
}

export default Sidebar;