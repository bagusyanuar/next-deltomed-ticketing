import React from 'react'

function Pagination({ data, totalPage, currentPage, perPage, onPageChange, onNextPage, onPrevoiusPage }) {
    return (
        <nav className='flex items-center justify-between pt-4'>
            {
                data.length > 0 ? <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>{((currentPage - 1) * perPage) + 1}-{(((currentPage - 1) * perPage) + perPage) > data.length ? data.length : (((currentPage - 1) * perPage) + perPage)}</span> of <span className='font-semibold'>{data.length}</span>
                </span> : <span className='text-sm text-slate-600 '>Showing Empty Record</span>
            }
            <ul className='inline-flex items-center -space-x-px'>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onPrevoiusPage() }} className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-l-md'>
                        <span className="material-symbols-outlined text-sm">
                            chevron_left
                        </span>
                    </a>
                </li>
                {
                    Array.from(Array(totalPage)).map((value, index) => {
                        return (
                            <li key={index} className=''>
                                <a href='#' onClick={(e) => { e.preventDefault(); onPageChange((index + 1)) }} data-page={index + 1} className={`${currentPage === (index + 1) ? 'bg-green-500 text-white border-green-500' : 'text-slate-600 border-slate-300'} text-sm  px-3 py-2 leading-tight border`}>
                                    {index + 1}
                                </a>
                            </li>
                        );
                    })
                }
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onNextPage() }} className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-r-md'>
                        <span className="material-symbols-outlined text-sm">
                            chevron_right
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination

export const PageLength = ({ onChange }) => {
    return (
        <div className='flex items-center mb-3'>
            <span className='text-sm text-slate-600 me-2'>Show :</span>
            <select onChange={(e) => {onChange(e)}} id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                <option className='bg-white text-slate-600 hover:bg-slate-200' value={5}>5</option>
                <option className='bg-white text-slate-600 hover:bg-slate-200' value={10}>10</option>
                <option className='bg-white text-slate-600 hover:bg-slate-200' value={25}>25</option>
            </select>
            <span className='text-sm text-slate-600 ms-2'>entries</span>
        </div>
    )
}