
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

function BaseTable({ headers, column, data, dataKey }) {

    const [perPage, setPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(0)
    const [rowData, setRowData] = useState([])

    const handleChangePerpage = (e) => {
        let perPage = parseInt(e.target.value);
        setPerPage(perPage)
    }

    const handleChangePage = (e) => {
        e.preventDefault();
        let targetPage = parseInt(e.target.dataset.page);
        setPage(targetPage)
    }

    const handleNextPage = (e) => {
        e.preventDefault();
        if (page < countPage) {
            setPage(page + 1);
        }
    }

    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const sortData = (key) => {
        rowData.sort((a, b) => (a['data'][0]['value'] > b['data'][0]['value']) ? 1 : ((b['data'][0]['value'] > a['data'][0]['value']) ? -1 : 0))
        setRowData(rowData)
    }

    useEffect(() => {
      setRowData(data)
    }, [data])
    

    useEffect(() => {
        console.log('affected');
        let dataLength = data.length;
        let totalPage = Math.ceil(dataLength / perPage);
        setCountPage(totalPage)
        if (page > totalPage && page > 1) {
            setPage(totalPage)
        }
        return () => {
            setCountPage(0)
        }
    }, [perPage, data.length])

    return (
        <div>

            {/* per page section */}
            <div className='flex items-center mb-3'>
                <span className='text-sm text-slate-600 me-2'>Show :</span>
                <select onChange={handleChangePerpage} id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={5}>5</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={10}>10</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={25}>25</option>
                </select>
                <span className='text-sm text-slate-600 ms-2'>entries</span>
            </div>

            {/* main table section */}
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            {
                                headers.map((v, i) => {
                                    return (
                                        <th key={i} scope="col" className={`px-6 py-3 ${v['className']}`}>
                                            <div className='flex items-center'>
                                                {v['value']}
                                                {
                                                    v['sort'] ? <a href="#" onClick={(e) => { e.preventDefault(); sortData(i) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                                    </a> : ''
                                                }

                                            </div>
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rowData.length > 0 ? rowData.slice(((page - 1) * perPage), (page * perPage)).map((value, index) => {
                                console.log(value);
                                return (
                                    <tr key={index} className='bg-white border-b'>
                                        <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{((index + 1) + ((page - 1) * perPage))}</td>
                                        {
                                            value.data.map((v, i) => {
                                                return (
                                                    <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap ${v['className']}`}>{v['value']}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                );
                            }) : <tr>
                                <td colSpan={headers.length} className='text-center px-6 py-3 text-gray-500 whitespace-nowrap'>No Record</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>

            {/* pagination section */}
            <nav className='flex items-center justify-between pt-4'>
                {
                    data.length > 0 ? <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>{((page - 1) * perPage) + 1}-{(((page - 1) * perPage) + perPage) > data.length ? data.length : (((page - 1) * perPage) + perPage)}</span> of <span className='font-semibold'>{data.length}</span>
                    </span> : <span className='text-sm text-slate-600 '>Showing Empty Record</span>
                }
                <ul className='inline-flex items-center -space-x-px'>
                    <li>
                        <a href='#' onClick={handlePreviousPage} className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-l-md'>
                            <span className="material-symbols-outlined text-sm">
                                chevron_left
                            </span>
                        </a>
                    </li>
                    {
                        Array.from(Array(countPage)).map((value, index) => {
                            return (
                                <li key={index} className=''>
                                    <a href='#' onClick={handleChangePage} data-page={index + 1} className={`${page === (index + 1) ? 'bg-green-500 text-white border-green-500' : 'text-slate-600 border-slate-300'} text-sm  px-3 py-2 leading-tight border`}>
                                        {index + 1}
                                    </a>
                                </li>
                            );
                        })
                    }
                    <li>
                        <a href='#' onClick={handleNextPage} className='px-3 py-2 ml-0 leading-tight text-sm text-slate-600 border border-slate-300 rounded-r-md'>
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

BaseTable.propTypes = {
    headers: PropTypes.array,
    column: PropTypes.array,
    data: PropTypes.array,
    dataKey: PropTypes.array,
}
export default BaseTable