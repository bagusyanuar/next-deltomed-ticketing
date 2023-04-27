import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types';

function ModalAlert({ isOpen, onClose, message, type }) {
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
    let color = 'bg-green-500';
    let hoverColor = 'bg-green-600';
    if (type !== 'success') {
        color = 'bg-red-500';
        hoverColor = 'bg-red-600';
    }
    return (
        <div className={`${isOpen ? '' : 'hidden'} absolute z-50 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            <div className={`${isShow ? '' : 'opacity-0 scale-50'} transform  relative w-10/12 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-lg transition-opacity transition-transform ease-in-out duration-[300ms]`}>
                <div className='px-4 py-6'>
                    <div className='w-full flex justify-center mb-5'>
                        <Image src={`/assets/${type}.svg`} width={200} height={200} alt="error" />
                    </div>
                    <p className='mt-5 font-bold text-gray-600 text-center text-sm'>{type === 'success' ? 'SUCCESS' : 'ERROR'}</p>
                    <p className='text-gray-600 text-center text-sm mb-5'>{message}</p>
                    <div className='flex justify-center mt-3'>
                        <button
                            onClick={onClose}
                            type='button'
                            className={`flex items-center text-sm ${color} rounded-md py-1 px-4 text-white hover:${hoverColor} transition-colors ease-in duration-200`}
                        >
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalAlert.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error'])
}

export default ModalAlert