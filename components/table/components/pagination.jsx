import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Pagination({ data, totalPage, currentPage, perPage, onPageChange, onNextPage, onPrevoiusPage, onLastPage, onFirstPage }) {

    const [pages, setPages] = useState([])
    const [shownPages, setShownPages] = useState([])

    useEffect(() => {
        let indexOf = pages.indexOf(currentPage) + 1;
        let startIndex = indexOf - 2;
        let endIndex = indexOf + 3;
        let p = [];
        for (let index = startIndex; index < endIndex; index++) {
            p.push(index)
        }

        if (p[0] < 1) {
            p = pages.slice(0, 5)
        }

        if (p[4] > pages.length) {
            if (pages.length < 5) {
                p = pages
            } else {
                p = pages.slice(pages.length - 5, pages.length)
            }
        }
        setShownPages(p)
        return () => {
            setShownPages(0)
        }
    }, [currentPage, pages])

    useEffect(() => {
        let p = [];
        for (let i = 1; i <= totalPage; i++) {
            p.push(i)
        }
        setPages(p)
        return () => {
            setPages([])
        }
    }, [totalPage])

    return (
        <nav className='flex items-center justify-between pt-4'>
            {
                data.length > 0 ? <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>{((currentPage - 1) * perPage) + 1}-{(((currentPage - 1) * perPage) + perPage) > data.length ? data.length : (((currentPage - 1) * perPage) + perPage)}</span> of <span className='font-semibold'>{data.length}</span>
                <span>{` (${totalPage} pages)`}</span>
                </span> : <span className='text-sm text-slate-600 '>Showing Empty Record</span>
            }
            <ul className='inline-flex items-center -space-x-px'>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onFirstPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-l-md`}>
                        <span className="material-symbols-outlined text-sm">
                            first_page
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onPrevoiusPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
                        <span className="material-symbols-outlined text-sm">
                            chevron_left
                        </span>
                    </a>
                </li>
                {
                    shownPages.map((value, index) => {
                        return (
                            <li key={index} className=''>
                                <a href='#' onClick={(e) => { e.preventDefault(); onPageChange((value)); }} data-page={value} className={`${currentPage === value ? 'bg-green-500 text-white border-green-500' : 'text-slate-600 border-slate-300'} text-sm  px-3 py-2 leading-tight border`}>
                                    {value}
                                </a>
                            </li>
                        );
                    })
                }
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onNextPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
                        <span className="material-symbols-outlined text-sm">
                            chevron_right
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onLastPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-r-md`}>
                        <span className="material-symbols-outlined text-sm">
                            last_page
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

Pagination.defaultProps = {
    totalPage: 0, 
    currentPage: 1, 
    perPage: 0, 
    onPageChange: function () {}, 
    onNextPage: function () {}, 
    onPrevoiusPage: function () {}, 
    onLastPage: function () {},
    onFirstPage: function () {},
}
Pagination.propTypes = {
    data: PropTypes.array.isRequired,
    totalPage: PropTypes.number, 
    currentPage: PropTypes.number, 
    perPage: PropTypes.number, 
    onPageChange: PropTypes.func, 
    onNextPage: PropTypes.func, 
    onPrevoiusPage: PropTypes.func, 
    onLastPage: PropTypes.func,
    onFirstPage: PropTypes.func,
}

export default Pagination

export const PageLength = ({ pageLength, onChange }) => {
    return (
        <div className='flex items-center mb-3'>
            <span className='text-sm text-slate-600 me-2'>Show :</span>
            <select onChange={(e) => { onChange(e) }} id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                {
                    pageLength.map((v, i) => {
                        return (
                            <option key={i} className='bg-white text-slate-600 hover:bg-slate-200' value={v}>{v}</option>
                        )
                    })
                }
            </select>
            <span className='text-sm text-slate-600 ms-2'>entries</span>
        </div>
    )
}