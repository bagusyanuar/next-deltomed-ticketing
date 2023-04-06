import React from 'react'

function SidebarItem({ icon, title }) {
    return (
        <li className='sidebar-item rounded-md pl-3 transition-colors ease-in hover:bg-slate-100'>
            <span class="material-symbols-outlined text-slate-600">
                { icon }
            </span>
            <a href='' className='ms-2 text-slate-600 text-sm'>{title}</a>
        </li>
    )
}

SidebarItem.defaultProps = {
    icon: 'circle',
    title: 'Menu'
}
export default SidebarItem
