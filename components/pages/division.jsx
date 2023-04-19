import React, { Component } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import Textfield from '../forms/textfield'
import BaseTable from '../table/base-table'
import { DummyDivision } from '../../lib/dummy'
import axios from 'axios'
import { AxiosInstance } from '../../lib/api'
import TopLoadingBar from '../loader/loading-bar'

export class Division extends Component {

    constructor(props) {
        super(props)
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${props.token}`
        this.state = {
            isLoadingCreate: false,
            progress: 0,
            isModalOpen: false,
            error: false,
            message: '',
            name: '',
            data: [],
            tableColumn: [
                {
                    value: '#',
                    className: 'w-1 text-center'
                },
                {
                    value: 'Nama',
                    className: ''
                },
                {
                    value: 'Action',
                    className: 'w-3 text-center'
                },
            ],
            tableDataKey: [
                {
                    name: 'name',
                    className: ''
                },
                {
                    name: 'action',
                    className: 'w-3'
                },
            ]
        }
    }

    create = async () => {
        this.setState({
            isLoadingCreate: true,
            progress: 2
        })
        try {
            const data = { name: this.state.name }
            let config = {
                onUploadProgress: (progressEvent) => {
                    let progress = (progressEvent.loaded / progressEvent.total) * 100;
                    console.log(progress);
                    this.setState({
                        progress: progress
                    })
                }
            }
            await AxiosInstance.post('/division', JSON.stringify(data), config)
            console.log('success');
        } catch (error) {
            console.log(error.response);
            let message = error.response === undefined ? 'internal server error...' : error.response.data.message;
            this.setState({
                error: true,
                progress: 100,
                message: message
            })
        } finally {
            this.setState({
                isLoadingCreate: false
            })
        }
    }

    createDummy = () => {
        let index = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1]['id'] : 0
        this.state.data.push({
            id: (index + 1),
            name: this.state.name,
            action: (<a href='#'>Edit</a>)
        })
    }
    handleSave = (e) => {
        // this.create();
        this.createDummy();
    }
    render() {
        return (
            <div>
                <TopLoadingBar progress={this.state.progress} onFinished={() => {
                    this.setState({
                        progress: 0
                    })
                }} />
                <div className='flex items-center justify-between'>
                    <div className='breadcrumb'>
                    </div>
                    <button
                        onClick={() => { this.setState({ isModalOpen: true }) }}
                        type='button'
                        className='flex items-center text-sm rounded-md py-2 px-6 mb-5 text-white bg-green-500 hover:bg-green-600 transition-colors ease-in duration-200'
                    >
                        <span className="material-symbols-outlined me-2">
                            add_circle
                        </span>
                        <span>Add Item</span>
                    </button>
                </div>
                <div className='w-full rounded-md bg-white shadow-md'>
                    <div className='h-1 w-full bg-green-500 rounded-t-md'></div>
                    <div className='px-4 py-4'>
                        <p className='text-gray-600 text-sm'>Data Table Division</p>
                        <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                        <BaseTable column={this.state.tableColumn} data={this.state.data} dataKey={this.state.tableDataKey}/>
                    </div>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <button
                            onClick={this.handleSave}
                            type='button'
                            className='flex items-center text-sm bg-green-500 rounded-md py-1 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'
                        >
                            <span className="material-symbols-outlined me-1">
                                check
                            </span>
                            <span>Save</span>
                        </button>
                    </div>
                </Modal>
                <ModalAlert isOpen={this.state.error} onClose={() => { this.setState({ error: false }) }} message={this.state.message}>

                </ModalAlert>
            </div>
        )
    }
}

export default Division