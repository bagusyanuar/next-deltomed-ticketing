import React from 'react'

function Body({ data }) {
    console.log('table body');
    return (
        <tr className='bg-white border-b'>
            <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{1}</td>
        </tr>
    )
}

export default Body