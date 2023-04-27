import React from 'react'

function Content({ children }) {
    return (
        <div className='w-full h-screen pl-[280px] sm:pl-14 md:pl-14 lg:pl-[280px] transition-all ease-in-out duration-500'>
            {children}
        </div>
    )
}

export default Content