import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'

function Navigation({ title, children }) {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='grow bg-base'>
                <Navbar title={title} />
                <div className='content px-8'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navigation