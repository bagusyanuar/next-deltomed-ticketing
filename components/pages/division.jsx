import React, { Component, useEffect } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import ModalConfirmation from '../modal/confirmation'
import BlockLoader from '../loader/block'
import Textfield from '../forms/textfield'
import BaseTable from '../table/base-table'
import BaseAction from '../table/base-action';
import { AxiosInstance } from '../../lib/api'

import { connect } from 'react-redux'
import { getData, createData, patchData, deleteData, resetError, resetSuccess } from '../../redux/features/divisionSlice'


export class Division extends Component {

    constructor(props) {
        super(props)
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${props.token}`
        this.state = {
            isModalOpen: false,
            isModalConfirmation: false,
            id: '',
            name: '',
            data: [],
            tableHeader: tableHeader,
            typeCreate: 'create'
        }
    }

    async componentDidMount() {
        await this.props.getData({ AxiosInstance, limit: 100, offset: 0 })
        this.createTableData()
    }

    handleEdit = (rowData) => {
        this.setState({
            isModalOpen: true,
            name: rowData['name'],
            id: rowData['id'],
            typeCreate: 'patch'
        })
        console.log(rowData);
    }

    handleDelete = (id) => {
        this.setState({
            isModalConfirmation: true,
            id: id,
            typeCreate: 'delete'
        })
        console.log(id);
    }
    //creating tabel data
    tableData(data) {
        let results = [];
        data.forEach(value => {
            let tmpRowData = [
                {
                    value: value['name'],
                    className: ''
                },
                {
                    value: <BaseAction onEdit={() => { this.handleEdit(value); }} onDelete={() => { this.handleDelete(value['id']) }} />,
                    className: 'text-center'
                }
            ];

            let tmp = {
                row: value,
                data: tmpRowData
            }
            results.push(tmp)
        });
        return results;
    }

    createTableData = () => {
        let data = this.tableData(this.props.division.divisions);
        this.setState({
            data: data
        })

    }

    handleSave = async (e) => {
        const data = { name: this.state.name }
        if (this.state.typeCreate === 'patch') {
            await this.props.patchData({
                AxiosInstance, id: this.state.id, data: JSON.stringify(data)
            })
        } else {
            await this.props.createData({
                AxiosInstance, data: JSON.stringify(data)
            })
        }
    }

    deleteData = async (e) => {
        this.setState({
            isModalConfirmation: false
        })
        await this.props.deleteData({ AxiosInstance, id: this.state.id })
    }

    onSuccessCallback = async () => {
        this.props.resetSuccess()
        await this.props.getData({ AxiosInstance, limit: 100, offset: 0 })
        this.createTableData()
        this.setState({
            name: '',
            id: '',
            isModalOpen: this.state.typeCreate === 'create' ? true : false
        })
    }

    render() {
        return (
            <div>
                <div className='flex items-center justify-between'>
                    <div className='breadcrumb'>
                    </div>
                    <button
                        onClick={() => { this.setState({ isModalOpen: true, typeCreate: 'create' }) }}
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
                        <BaseTable headers={this.state.tableHeader} data={this.state.data} />
                    </div>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <button
                            onClick={this.handleSave}
                            disabled={this.props.division.isLoading && this.props.division.type === 'CREATE'}
                            type='button'
                            className='flex items-center text-sm bg-green-500 rounded-md py-2 px-4 text-white hover:bg-green-600 transition-colors ease-in duration-200'
                        >
                            {
                                (this.props.division.isLoading && this.props.division.type === 'CREATE') ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <BlockLoader isOpen={(this.props.division.isLoading && this.props.division.type === 'DELETE')} message='sedang menghapus data....' />
                <ModalConfirmation isOpen={this.state.isModalConfirmation} message='Yakin ingin menghapus?' onRejected={() => { this.setState({ isModalConfirmation: false }) }} onAccepted={() => { this.deleteData() }} />
                <ModalAlert type='error' isOpen={(this.props.division.error && (this.props.division.type === 'CREATE' || this.props.division.type === 'DELETE'))} callback={() => { this.props.resetError() }} message={`internal server error`} />
                <ModalAlert type='success' isOpen={(this.props.division.success && (this.props.division.type === 'CREATE' || this.props.division.type === 'DELETE'))} callback={() => { this.onSuccessCallback() }} message={`success`} />
            </div>
        )
    }
}

const tableHeader = [
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
]

const mapStateToProps = (state) => ({
    division: state.reducer.division
})

const mapDispatchToProps = { getData, createData, patchData, deleteData, resetError, resetSuccess }


export default connect(mapStateToProps, mapDispatchToProps)(Division)