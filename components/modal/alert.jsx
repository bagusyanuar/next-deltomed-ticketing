import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

function ModalAlert({ isOpen, onClose }) {
    const [isShow, setShow] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShow(true)
            }, 50);
        } else {
            setShow(false)
        }
    }, [isOpen])
    return (
        <div className={`${isOpen ? '' : 'hidden'} absolute z-50 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            <div className={`${isShow ? '' : 'opacity-0 scale-50'} transform  relative w-10/12 md:w-1/4 bg-white rounded shadow-lg transition-opacity transition-transform ease-in-out duration-[300ms]`}>
                <div className='px-4 py-4'>
                    <div className='w-full flex justify-center mb-5'>
                        <Image src="/assets/error.svg" width={200} height={200} alt="error" />
                    </div>
                    <p className='mt-5 font-bold text-gray-600 text-center text-sm'>Error!!!</p>
                    <p className='text-gray-600 text-center text-sm mb-5'>Internal Server Error</p>
                    <div className='flex justify-center mt-3'>
                        <button
                            onClick={onClose}
                            type='button'
                            className='flex items-center text-sm bg-red-500 rounded-md py-1 px-4 text-white hover:bg-red-600 transition-colors ease-in duration-200'
                        >
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAlert