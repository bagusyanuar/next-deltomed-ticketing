import React from 'react'
import PropTypes from 'prop-types'

function Action({ onEdit, onDelete }) {
    return (
        <div className='flex'>
            <a href='#' className='btn-edit mr-1 rounded-md text-white bg-orange-400 py-1 px-2 hover:bg-orange-500 hover:text-white transition-colors ease-in duration-200' onClick={(e) => { e.preventDefault(); onEdit(); }}>
                <span className="material-symbols-outlined text-sm">
                    edit
                </span>
            </a>
            <a href='#' className='btn-delete rounded-md text-white bg-red-400 py-1 px-2 hover:bg-red-500 hover:text-white transition-colors ease-in duration-200' onClick={(e) => { e.preventDefault(); onDelete(); }}>
                <span className="material-symbols-outlined text-sm">
                    delete
                </span>
            </a>
        </div>
    )
}

Action.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

export default Action