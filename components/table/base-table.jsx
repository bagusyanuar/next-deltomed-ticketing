
import React from 'react'

function BaseTable() {
    return (
        <div>

            {/* per page section */}
            <div className='flex items-center mb-3'>
                <span className='text-sm text-slate-600 me-2'>Show :</span>
                <select id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={5}>5</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={10}>10</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={25}>25</option>
                </select>
                <span className='text-sm text-slate-600 ms-2'>entries</span>
            </div>

            {/* main table section */}
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className="text-xs text-slate-600 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3 w-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-3 w-1 text-sm text-slate-600 whitespace-nowrap">
                                1
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-600">
                                Teknis
                            </td>

                            <td className="px-6 py-3 w-3">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-3 w-1 text-sm text-slate-600 whitespace-nowrap">
                                2
                            </td>
                            <td className="px-6 py-3 text-sm text-slate-600">
                                Umum
                            </td>

                            <td className="px-6 py-3 w-3">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* pagination section */}
            <nav className='flex items-center justify-between pt-4'>
                <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>1-2</span> of <span className='font-semibold'>2</span>
                </span>
                <ul className='inline-flex items-center -space-x-px'>
                    <li>
                        <a href='#' className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-l-md'>
                            <span className="material-symbols-outlined text-sm">
                                chevron_left
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-sm text-slate-600 px-3 py-2 leading-tight border border-slate-300'>
                            1
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-sm text-slate-600 px-3 py-2 leading-tight border border-slate-300'>
                            2
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-sm text-slate-600 px-3 py-2 leading-tight border border-slate-300'>
                            3
                        </a>
                    </li>
                    <li>
                        <a href='#' className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-r-md'>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default BaseTable