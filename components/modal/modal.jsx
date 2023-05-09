import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, title, children, size }) {
    const [isShow, setShow] = useState(false)
    const [modalSize, setModalSize] = useState('w-10/12 md:w-1/4')

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
        if (size === 'lg') {
            setModalSize('w-10/12 lg:w-1/3 md:w-1/2')
        }
    }, [isOpen, size])


    return (
        <div className={`${isOpen ? '' : 'hidden'} absolute z-30 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            {/* modal */}
            <div className={`${isShow ? '' : 'opacity-0 -translate-y-full'} transform  relative ${modalSize} bg-white rounded shadow-lg transition-opacity transition-transform ease-in-out duration-[700ms]`}>
                {/* header */}
                <div className='px-4 py-3 border-b border-gray-200'>
                    <div className='flex text-slate-600 text-sm items-center justify-between'>
                        <div className='font-semibold'>{title}</div>
                        <button onClick={handleClose}>
                            <span className="material-symbols-outlined text-sm">
                                close
                            </span>
                        </button>
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