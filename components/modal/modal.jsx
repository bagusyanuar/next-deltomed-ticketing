import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, title,  children  }) {
    const [isShow, setShow] = useState(false)

    const handleClose = (e) => {
        onClose()
    }

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
        <div className={`${isOpen ? '' : 'hidden'} absolute z-30 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            {/* modal */}
            <div className={`${isShow ? '' : 'opacity-0 -translate-y-full'} transform  relative w-10/12 md:w-1/4 bg-white rounded shadow-lg transition-opacity transition-transform ease-in-out duration-[1200ms]`}>
                {/* header */}
                <div className='px-4 py-3 border-b border-gray-200'>
                    <div className='flex text-slate-600 text-sm items-center justify-between'>
                        <div className='font-semibold'>{title}</div>
                        <button onClick={handleClose}>x</button>
                    </div>
                </div>

                {/* body */}
                <div className='px-4 py-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    title: 'Modal Title'
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string
}
export default Modal