import React from 'react'
import Sidebar from '../navigation/sidebar'
import SidebarItem from '../navigation/sidebar/item'
import Navbar from '../navigation/navbar'
import Image from 'next/image'
import Content from './content'
import { useRouter } from 'next/router'

function Layout({ title, children }) {
    const router = useRouter();
    const path = router.pathname;
    return (
        <div>
            <Sidebar>
                <div className='md:flex md:items-center md:mt-3 md:mb-10 sm:mb-10 sm:flex sm:justify-center'>
                    <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                    <p className='font-bold ms-2 sm:hidden md:hidden lg:block block'>Company Name</p>
                </div>
                <SidebarItem icon="dashboard" title="Dashboard" link="/dashboard" active={path === '/dashboard' ? true : false} />
                <SidebarItem icon="group_work" title="Division" link="/division" active={path === '/division' ? true : false} />
                <SidebarItem icon="location_searching" title="Location" link="/location" active={path === '/location' ? true : false} />
                <SidebarItem icon="account_circle" title="Users" link="/users" />
                <SidebarItem icon="confirmation_number" title="Products" link="/products" />
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