import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { CreateData, SortData } from '../util'
import TableBody from '../components/body'
import TableHeader from '../components/header'
import TablePagination, { PageLength } from '../components/pagination'

function Index({ headers, data, withIndex, column, pagination, onSorted, pageLength }) {

    const [perPage, setPerPage] = useState(pageLength[0])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [rowData, setRowData] = useState([])
    const [sort, setSort] = useState('ASC')

    //component effetcs
    useEffect(() => {
        let results = CreateData(data, column)
        setRowData(results)
    }, [data, column])

    useEffect(() => {
        console.log('paging changed');
        if (pagination) {
            let t = Math.ceil(data.length / perPage);
            setTotalPage(t)
            if (page > t && page > 1) {
                setPage(t)
            }
        }

        return () => {
            setTotalPage(0)
        }
    }, [perPage, data.length, pagination])

    //component events
    const handleChangePerpage = (e) => {
        let perPage = parseInt(e.target.value);
        setPerPage(perPage)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    const handleNextPage = (e) => {
        if (page < totalPage) {
            setPage(page + 1);
        }
    }

    const handlePreviousPage = (e) => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleFirstPage = (e) => {
        setPage(1)
    }

    const handleLastPage = () => {
        setPage(totalPage)
    }

    const handleSort = (key) => {
        if (sort === 'ASC') {
            setSort('DESC')
        } else {
            setSort('ASC')
        }
        let sorted = SortData(rowData, key, sort)
        if (onSorted !== undefined && typeof onSorted === 'function') {
            let dataSorted = []
            sorted.forEach(v => {
                dataSorted.push(v['original'])
            });
            onSorted(dataSorted)
        }
    }

    return (
        <div>
            {
                pagination ? <PageLength pageLength={pageLength} onChange={(e) => { handleChangePerpage(e) }} /> : ''
            }
            <div className='relative overflow-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md overflow-x-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <TableHeader headers={headers} withIndex={withIndex} onSort={(key) => { handleSort(key) }} />
                    <TableBody data={rowData} headers={headers} withIndex={withIndex} pagination={pagination} page={page} perPage={perPage} />
                </table>
            </div>
            {
                pagination ? <TablePagination
                    data={rowData}
                    totalPage={totalPage}
                    currentPage={page}
                    perPage={perPage}
                    onPageChange={(p) => { handleChangePage(p) }}
                    onNextPage={() => handleNextPage()}
                    onPrevoiusPage={() => handlePreviousPage()}
                    onFirstPage={() => handleFirstPage()}
                    onLastPage={() => handleLastPage()}
                /> : ''
            }
        </div>
    )
}

Index.defaultProps = {
    withIndex: false,
    pagination: true,
    pageLength: [5, 10, 25],
    onSorted: function (data) {},
}
Index.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    column: PropTypes.array.isRequired,
    withIndex: PropTypes.bool,
    pagination: PropTypes.bool,
    onSorted: PropTypes.func,
    pageLength: PropTypes.array,
}
export default Index