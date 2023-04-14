import React, { Component } from 'react'
import Sidebar from '../navigation/sidebar';
import Navbar from '../navigation/navbar';
import Textfield from '../forms/textfield'
import Modal from '../modal/modal'
import axios from 'axios';
import Loader from '../loader/base-loader'

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

    saveDataDivision = async () => {
        this.setState({
            isLoading: true
        })
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

    handleSave = (e) => {

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
                    <div className="flex justify-end mt-3">
                        <div className=''>
                            <button
                                disabled={this.state.isLoading}
                                onClick={this.handleAddButton}
                                type='button'
                                className='flex items-center text-sm bg-green-500 rounded-md py-1 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                <span>Simpan</span>
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