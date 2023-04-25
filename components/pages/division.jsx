import React, { Component } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import Textfield from '../forms/textfield'
import BaseTable from '../table/base-table'
import { DummyDivision } from '../../lib/dummy'
import axios from 'axios'
import { AxiosInstance } from '../../lib/api'
import TopLoadingBar from '../loader/loading-bar'

import { connect } from 'react-redux'
import { getData } from '../../redux/features/divisionSlice'

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
    handleSave = async (e) => {
        const resp = await this.props.getData(AxiosInstance)
        console.log(resp);
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
                        <BaseTable column={this.state.tableColumn} data={this.state.data} dataKey={this.state.tableDataKey} />
                    </div>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <button
                            onClick={this.handleSave}
                            type='button'
                            className='flex items-center text-sm bg-green-500 rounded-md py-2 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'
                        >
                            {/* <span className="material-symbols-outlined me-1">
                                check
                            </span>
                            <span>Save</span> */}
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Loading...
                        </button>
                    </div>
                </Modal>
                <ModalAlert isOpen={this.state.error} onClose={() => { this.setState({ error: false }) }} message={this.state.message}>

                </ModalAlert>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    division: state.reducer.division
})

const mapDispatchToProps = { getData }
export default connect(mapStateToProps, mapDispatchToProps)(Division)