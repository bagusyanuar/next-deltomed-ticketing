import React from 'react'

function Sidebar({ children }) {
    return (
        <div className='fixed flex flex-col left-0 h-screen w-[280px] md:w-14 lg:w-[280px] sm:w-14 px-5 md:px-1 lg:px-4 sm:px-1 py-5 bg-white border-r border-slate-200 transition-all ease-in-out duration-500'>
            {children}
        </div>
    )
}

export default Sidebar
