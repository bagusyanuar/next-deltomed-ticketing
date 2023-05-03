import React from 'react'
import EmptyRecord from './empty-record'

function Body({ data, withIndex, headers, page, perPage, pagination }) {
    if (data.length <= 0) {
        return (
            <tbody>
                <EmptyRecord colspan={withIndex ? (headers.length + 1) : headers.length} message={`No Record Found`} />
            </tbody>
        )
    }
    return (
        <tbody>
            {
                pagination ?
                data.slice(((page - 1) * perPage), (page * perPage)).map((value, index) => {
                    return (
                        <tr key={index} className='bg-white border-b'>
                            {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{((index + 1) + ((page - 1) * perPage))}</td> : ''}
                            {
                                headers.map((v, i) => {
                                    return (
                                        <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>
                                            { value['row'][i] }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                }) : data.map((value, index) => {
                    return (
                        <tr key={index} className='bg-white border-b'>
                            {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{(index + 1)}</td> : ''}
                            {
                                headers.map((v, i) => {
                                    return (
                                        <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>
                                            { value['row'][i] }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )


}

export default Body