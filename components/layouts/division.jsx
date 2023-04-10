import React, { Component } from 'react'
import Sidebar from '../navigation/sidebar';
import Navbar from '../navigation/navbar';
import Textfield from '../forms/textfield'
import Modal from '../modal/modal'
import axios from 'axios';

export class Division extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            isLoading: false,
        }
    }

    componentDidMount() {
        console.log('mounting');
        this.getDataDivision()
    }
    handleChange = (e, value) => {
        console.log(value, e.target.id);
    }

    getDataDivision = async () => {
        this.setState({
            isLoading: true
        })

        axios.get('http://localhost:8000/api/admin/division').then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
        // try {
        //     const response = await axios.get('http://localhost:8000/api/admin/division')
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     this.setState({
        //         isLoading: false
        //     })
        // }
    }

    handleAddButton = (e) => {
        this.setState({
            modalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            modalOpen: false
        })
    }
    render() {
        return (
            <div className='flex'>
                <Sidebar />
                <div className='grow bg-base'>
                    <Navbar title="Divisi" />
                    <div className='content px-8 mt-3'>
                        <div className='bg-white rounded-lg shadow-md w-full p-5'>
                            <div className='flex items-center'>
                                <p className='grow font-bold text-sm text-slate-600'>Data Divisi</p>
                                <button
                                    onClick={this.handleAddButton}
                                    type='button'
                                    className='flex items-center text-sm bg-green-500 rounded-md py-2 px-6 text-white hover:bg-green-600 transition-colors ease-in duration-200'>
                                    <span className="material-symbols-outlined me-2">
                                        add_circle
                                    </span>
                                    Tambah
                                </button>
                            </div>
                            <div className='border-b border-slate-300 mt-5 mb-5'>
                            </div>
                            <div className='flex items-center mb-3'>
                                <span className='text-sm text-slate-600 me-2'>Show :</span>
                                <select id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={5}>5</option>
                                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={10}>10</option>
                                    <option className='bg-white text-slate-600 hover:bg-slate-200' value={25}>25</option>
                                </select>
                                <span className='text-sm text-slate-600 ms-2'>entries</span>
                            </div>
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
                    </div>
                </div>
                <Modal isOpen={this.state.modalOpen} onClose={this.handleCloseModal}>
                    <div className='flex w-full content-between items-center mb-2'>
                        <span className='grow text-sm text-slate-600 text-left'>Tambah Divisi</span>
                        <button onClick={this.handleCloseModal}>
                            <span className="material-symbols-outlined text-sm text-slate-600">
                                close
                            </span>
                        </button>
                    </div>
                    <div className='border-b border-slate-300 mb-3'>
                    </div>
                    <Textfield id='name' placeholder='name' onChange={this.handleChange} />
                    <div className="text-end mt-3">
                        <div>
                            <button
                                onClick={this.handleAddButton}
                                type='button'
                                className='text-end flex items-center text-sm bg-green-500 rounded-md py-1 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                Simpan
                            </button>
                        </div>

                        {/* <button onClick={this.handleCloseModal} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button> */}
                        {/* <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button> */}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Division