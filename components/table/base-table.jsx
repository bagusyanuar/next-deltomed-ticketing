
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { ConverDotNested } from '../../lib/helper'
import TableBody from './body'
import TableHeader from './header'
import TablePagination, { PageLength } from './pagination'

function BaseTable({ headers, data, withIndex, column, pagination }) {
    console.log('rendered');

    const [perPage, setPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState(0)
    const [rowData, setRowData] = useState([])
    const [sort, setSort] = useState('ASC')

    const handleChangePerpage = (e) => {
        let perPage = parseInt(e.target.value);
        setPerPage(perPage)
    }

    const handleChangePage = (page) => {
        // e.preventDefault();
        // let targetPage = parseInt(e.target.dataset.page);
        console.log(page);
        setPage(page)
    }


    useEffect(() => {
        let results = [];
        data.forEach((v, i) => {
            let row = [];
            column.forEach((vH, iH) => {
                let tmp = ''
                if (vH['value'] !== null && vH['value'] !== undefined) {
                    tmp = ConverDotNested(v, vH['value'])
                } else {
                    if (vH['render'] !== undefined) {
                        tmp = vH['render'](v)
                    }
                }
                row.push(tmp)
            })
            let result = {
                original: v,
                row: row
            }
            results.push(result)
        });
        setRowData(results)
    }, [data, column])

    const handleNextPage = (e) => {
        // e.preventDefault();
        if (page < countPage) {
            setPage(page + 1);
        }
    }

    const handlePreviousPage = (e) => {
        // e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const sortData = (key) => {
        if (sort === 'ASC') {
            setSort('DESC')
        } else {
            setSort('ASC')
        }
        let d = [...rowData]
        let sorted = [];

        if (sort === 'DESC') {
            sorted = d.sort((a, b) => (a['row'][key] < b['row'][key]) ? 1 : ((b['row'][key] > a['row'][key]) ? -1 : 0))
        } else {
            sorted = d.sort((a, b) => (a['row'][key] > b['row'][key]) ? 1 : ((b['row'][key] > a['row'][key]) ? -1 : 0))
        }
        setRowData(sorted)
    }


    useEffect(() => {
        console.log('paging changed');
        if (pagination) {
            let dataLength = data.length;
            let totalPage = Math.ceil(dataLength / perPage);
            setCountPage(totalPage)
            if (page > totalPage && page > 1) {
                setPage(totalPage)
            }
        }

        return () => {
            setCountPage(0)
        }
    }, [perPage, data.length, pagination])

    return (
        <div>

            {/* per page section */}
            {
                pagination ? <PageLength onChange={(e) => { handleChangePerpage(e) }} /> : ''
            }



            {/* main table section */}
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <TableHeader headers={headers} withIndex={withIndex} onSort={(key) => { sortData(key) }} />
                    <TableBody data={rowData} headers={headers} withIndex={withIndex} pagination={pagination} page={page} perPage={perPage} />
                </table>
            </div>

            {/* pagination section */}
            {
                pagination ? <TablePagination
                    data={rowData}
                    totalPage={countPage}
                    currentPage={page}
                    perPage={perPage}
                    onPageChange={(p) => { handleChangePage(p) }}
                    onNextPage={() => handleNextPage()}
                    onPrevoiusPage={() => handlePreviousPage()}
                /> : ''
            }


        </div>
    )
}

BaseTable.propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    column: PropTypes.array,
    withIndex: PropTypes.bool,
    pagination: PropTypes.bool,
}
export default BaseTable

{/* {
                            rowData.length > 0 ? rowData.slice(((page - 1) * perPage), (page * perPage)).map((value, index) => {
                                return (
                                    <tr key={index} className='bg-white border-b'>
                                        {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{((index + 1) + ((page - 1) * perPage))}</td> : ''}
                                        {
                                            value.data.map((v, i) => {
                                                return (
                                                    <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>{v}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            }) : <EmptyRecord countHeaders={withIndex ? (headers.length + 1) : headers.length} />
                        } */}

{/* <div className='flex items-center mb-3'>
                <span className='text-sm text-slate-600 me-2'>Show :</span>
                <select onChange={handleChangePerpage} id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={5}>5</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={10}>10</option>
                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={25}>25</option>
                </select>
                <span className='text-sm text-slate-600 ms-2'>entries</span>
            </div> */}

{/* <nav className='flex items-center justify-between pt-4'>
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
            </nav> */}