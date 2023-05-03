import React from 'react'

function Empty({ colspan, message }) {
    return (
        <tr>
            <td colSpan={colspan} className='text-center py-4 text-gray-500 whitespace-nowrap'>{message}</td>
        </tr>
    )
}

export default Empty