import React from 'react'

function SidebarItem({ icon, title, link }) {
    return (
        <li className='sidebar-item rounded-md md:pl-3 sm:pl-0 transition-all ease-in hover:bg-slate-100'>
            <span className="material-symbols-outlined text-slate-600">
                { icon }
            </span>
            <a href={link} className='md:block ms-2 text-slate-600 text-sm w-full sm:hidden'>{title}</a>
        </li>
    )
}

SidebarItem.defaultProps = {
    icon: 'circle',
    title: 'Menu',
    link: '#'
}
export default SidebarItem
