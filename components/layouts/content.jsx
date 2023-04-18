import React from 'react'

function Content({ children }) {
    return (
        <div className='w-full h-screen pl-[280px] md:pl-[280px] lg:pl-[280px] sm:pl-14 transition-all ease-in-out duration-500'>
            {children}
        </div>
    )
}

export default Content