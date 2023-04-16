import React from 'react'
import Sidebar from '../navigation/sidebar'
import SidebarItem from '../navigation/sidebar/item'
import Navbar from '../navigation/navbar'
import Image from 'next/image'
import Content from './content'

function Layout({ title, children }) {
    return (
        <div>
            <Sidebar>
                <div className='md:flex md:items-center md:mt-3 md:mb-10 sm:mb-10 sm:flex sm:justify-center'>
                    <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                    <p className='md:block font-bold ms-2 sm:hidden'>Company Name</p>
                </div>
                <SidebarItem icon="dashboard" title="Dashboard" link="/dashboard" active={true} />
                <SidebarItem icon="group_work" title="Tag" link="division" />
                <SidebarItem icon="location_searching" title="Location" />
                <SidebarItem icon="account_circle" title="Users" />
                <SidebarItem icon="confirmation_number" title="Products" />
            </Sidebar>
            <Content>
                <Navbar title={title} />
                <div className='px-5 md:px-5 lg:px-5 sm:px-3 py-3 md:py-3 lg:py-3 sm:py-2'>
                    {children}
                </div>
            </Content>
        </div>
    )
}

export default Layout