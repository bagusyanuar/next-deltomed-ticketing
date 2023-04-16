import React, { Component } from 'react'
import Sidebar from '../navigation/sidebar-old';
import Navbar from '../navigation/navbar-old';
import Textfield from '../forms/textfield'
import Modal from '../modal/modal'
import axios from 'axios';
import TopLoadingBar from '../loader/loading-bar';
import { AxiosInstance } from '../../lib/api'

export class Division extends Component {

    constructor(props) {
        super(props)
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${props.token}`
        this.state = {
            modalOpen: false,
            isLoading: false,
            progress: 0,
            name: ''
        }
    }

    componentDidMount() {
        this.getDataDivision()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getDataDivision = async () => {
        try {
            const response = await AxiosInstance.get('/division')
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({
                isLoading: false
            })
        }
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

    handleClear = () => {
        this.setState({
            name: ''
        })
    }
    handleSave = async (e) => {
        const data = {
            name: this.state.name
        }
        try {
            await AxiosInstance.post('/division', data, {
                onUploadProgress: (progressEvent) => {
                    let progress = (progressEvent.loaded / progressEvent.total) * 100;
                    this.setState({
                        progress: progress
                    })
                }
            })
            this.handleClear()
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className='flex'>
                <TopLoadingBar progress={this.state.progress} onFinished={() => {
                    this.setState({
                        progress: 0
                    })
                }} />

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
                <Modal title='Tambah Divisi' isOpen={this.state.modalOpen} onClose={this.handleCloseModal}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={this.handleChange} />
                    <div className="flex justify-end mt-3">
                        <div className=''>
                            <button
                                onClick={this.handleSave}
                                type='button'
                                className='flex items-center text-sm bg-green-500 rounded-md py-1 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                <span>Simpan</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Division