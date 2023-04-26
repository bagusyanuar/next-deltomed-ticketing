import React, { Component } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import Textfield from '../forms/textfield'
import BaseTable from '../table/base-table'
import { AxiosInstance } from '../../lib/api'
import TopLoadingBar from '../loader/loading-bar'

import { connect } from 'react-redux'
import { getData, createData, resetError } from '../../redux/features/divisionSlice'

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
        // const resp = await this.props.getData(AxiosInstance)
        // console.log(resp);
        const data = { name: this.state.name }
        await this.props.createData({
            AxiosInstance, data: JSON.stringify(data)
        })
        if (!this.props.division.error) {
            this.setState({
                name: ''
            })
        }
    }
    render() {
        return (
            <div>
                <TopLoadingBar progress={this.state.progress} onFinished={() => {
                    this.setState({
                        progress: 0
                    })
                }} />
                <div className='absolute top-4 right-4'>
                    <div id="alert-border-3" className="flex p-4 mb-4 text-green-800 border-l-4 border-green-300 bg-green-50 dark:text-green-400" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium">
                            A simple success alert with an <a href="#" className="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
                        </div>
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:text-green-400" data-dismiss-target="#alert-border-3" aria-label="Close">
                            <span className="sr-only">Dismiss</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>

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
                        <BaseTable headers={this.state.tableColumn} data={this.state.data} dataKey={this.state.tableDataKey} />
                    </div>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <button
                            onClick={this.handleSave}
                            disabled={this.props.division.isLoadingCreate}
                            type='button'
                            className='flex items-center text-sm bg-green-500 rounded-md py-2 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'
                        >
                            {
                                this.props.division.isLoadingCreate ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                    Loading...</> : <><span className="material-symbols-outlined me-1">
                                        check
                                    </span>
                                    <span>Save</span></>
                            }
                        </button>
                    </div>
                </Modal>
                <ModalAlert isOpen={this.props.division.error} onClose={() => { this.props.resetError() }} message={`internal server error`} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    division: state.reducer.division
})

const mapDispatchToProps = { getData, createData, resetError }
export default connect(mapStateToProps, mapDispatchToProps)(Division)