import React, { useState, useEffect, useRef } from 'react'

function Modal({isOpen, children, onClose}) {
    const [isShow, setShow] = useState(false)

    const handleClose = (e) => {
        onClose()
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShow(true)
            }, 300);
        } else {
            setShow(false)
        }
    }, [isOpen])
    return (
        <div className={`${isOpen ? 'relative' : 'hidden'} z-10`} aria-labelledby='modal-title' role="dialog" aria-modal={true}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className={`fixed inset-0 z-10 overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className={`transform relative ${isOpen ? '' : '-translate-y-full opacity-0'} w-1/4 overflow-hidden rounded-lg bg-white shadow-xl ease-in transition-transform duration-1000 transition-opacity`}>
                        <div className="bg-white px-4 pb-4 pt-3">
                            {children}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal