import React, { useState, useEffect, useRef } from 'react'

function Modal({isOpen, children, onClose}) {
    // const [isOpen, setOpen] = useState(false)

    const handleClose = (e) => {
        onClose()
    }

    return (
        <div className={`${isOpen ? 'relative' : 'hidden'} z-10`} aria-labelledby='modal-title' role="dialog" aria-modal={true}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className={`fixed inset-0 z-10 overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className={`transform ${isOpen ? 'relative translate-y-0 opacity-100' : 'hidden -translate-y-15 opacity-0'} w-1/4 overflow-hidden rounded-lg bg-white shadow-xl ease-in transition-transform duration-1000`}>
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