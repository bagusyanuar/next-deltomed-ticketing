import React from 'react'
import Image from 'next/image'

function BlockLoader({ isOpen, message }) {
  return (
    <div className={`${isOpen ? '' : 'hidden'} absolute z-50 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            <div className={`transform  relative w-10/12 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-lg transition-opacity transition-transform ease-in-out duration-[300ms]`}>
                <div className='px-4 py-6'>
                    <div className='w-full flex justify-center mb-5'>
                        <Image src={`/assets/waiting.svg`} width={150} height={150} alt="error" />
                    </div>
                    <p className='mt-5 font-bold text-gray-600 text-center text-sm'>Loading...</p>
                    <p className='text-gray-600 text-center text-sm mb-5'>{message}</p>
                </div>
            </div>
        </div>
  )
}

export default BlockLoader