import React, { useState } from 'react'

function Navbar() {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(current => !current);
    }
    return (
        <div className='w-full h-16 flex px-8 items-center'>
            <div className='grow'></div>
            <div>
                <div className='relative inline-block text-left'>
                    <div className='flex items-center'>
                        <span class="material-symbols-outlined text-slate-600 me-3">
                            notifications
                        </span>
                        <button onClick={toggleOpen} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-slate-600" id="menu-button" aria-expanded="true" aria-haspopup="true">
                            Administrator
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className={`${isOpen ? "absolute transition ease-in duration-75" : "hidden transition ease-out duration-100"} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-2`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div className="py-1 px-1" role="none">
                            {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a> */}
                            {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a> */}
                            {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a> */}
                            <a href='#' class="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar