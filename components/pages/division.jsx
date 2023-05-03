import React, { Component, useEffect } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import ModalConfirmation from '../modal/confirmation'
import BlockLoader from '../loader/block'
import Textfield from '../forms/textfield'
import BaseButton from '../forms/button'
import ButtonWithLoading from '../forms/button/with-loading'
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
            tableColumn: [],
            typeCreate: 'create'
        }
    }

    async componentDidMount() {
        console.log('mount');
        await this.props.getData({ AxiosInstance, limit: 100, offset: 0 })
        // this.createTableData()
    }

    handleEdit = (rowData) => {
        console.log('handle edit');
        // this.setState({
        //     isModalOpen: true,
        //     name: rowData['name'],
        //     id: rowData['id'],
        //     typeCreate: 'patch'
        // })
        // console.log(rowData);
    }

    handleDelete = (id) => {
        console.log('handle delete');
        // this.setState({
        //     isModalConfirmation: true,
        //     id: id,
        //     typeCreate: 'delete'
        // })
        console.log(id);
    }

    //creating tabel data
    // tableData(data) {
    //     console.log('table data');
    //     let results = [];
    //     data.forEach((value, index) => {
    //         let tmpRowData = [
    //             value['name'],
    //             (<BaseAction key={index} onEdit={() => { this.handleEdit(value); }} onDelete={() => { this.handleDelete(value['id']) }} />),
    //         ];

    //         let tmp = {
    //             row: value,
    //             data: tmpRowData
    //         }
    //         results.push(tmp)
    //     });
    //     return results;
    // }

    createTableData = () => {
        console.log('create table data');
        // let data = this.tableData(this.props.division.divisions);
        // this.setState({
        //     data: data,
        //     tableColumn: [
        //         {
        //             value: 'name'
        //         },
        //         {
        //             value: 'created_at'
        //         }
        //     ]
        // })

    }

    handleSave = async (e) => {
        console.log('handle save');
        // const data = { name: this.state.name }
        // if (this.state.typeCreate === 'patch') {
        //     await this.props.patchData({
        //         AxiosInstance, id: this.state.id, data: JSON.stringify(data)
        //     })
        // } else {
        //     await this.props.createData({
        //         AxiosInstance, data: JSON.stringify(data)
        //     })
        // }
    }

    deleteData = async (e) => {
        console.log('delete data');
        // this.setState({
        //     isModalConfirmation: false
        // })
        // await this.props.deleteData({ AxiosInstance, id: this.state.id })
    }

    onSuccessCallback = async () => {
        console.log('callback');
        // this.props.resetSuccess()
        // await this.props.getData({ AxiosInstance, limit: 100, offset: 0 })
        // this.createTableData()
        // this.setState({
        //     name: '',
        //     id: '',
        //     isModalOpen: this.state.typeCreate === 'create' ? true : false
        // })
    }

    render() {
        console.log('rendered');
        return (
            <div>
                <div className='flex items-center justify-between'>
                    <div className='breadcrumb'>
                    </div>
                    <BaseButton onClick={() => { this.setState({ isModalOpen: true, typeCreate: 'create' }); }}>
                        <span className="material-symbols-outlined me-2">
                            add_circle
                        </span>
                        <span>Add Item</span>
                    </BaseButton>
                </div>
                <div className='w-full rounded-md bg-white shadow-md'>
                    <div className='h-1 w-full bg-green-500 rounded-t-md'></div>
                    <div className='px-4 py-4'>
                        <p className='text-gray-600 text-sm'>Data Division</p>
                        <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                        <BaseTable
                            headers={this.state.tableHeader}
                            withIndex={true}
                            data={this.props.division.divisions}
                            pagination={true}
                            column={[
                                {
                                    value: 'name',
                                    // render: function (data) {
                                    //     return (<a href='#'>{data['name']}</a>)
                                    // }
                                },
                                {
                                    value: null,
                                    render: function (data) {
                                        return <BaseAction />
                                    }
                                }
                            ]} />
                    </div>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <ButtonWithLoading onClick={() => { this.handleSave() }} isLoading={(this.props.division.isLoading && this.props.division.type === 'CREATE')}>
                            <>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                <span>Save</span>
                            </>
                        </ButtonWithLoading>
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
        value: 'Nama',
        className: '',
        sort: true
    },
    {
        value: 'Action',
        className: 'w-3 text-center',
        // sort: false
    },
]

const column = () => [
    {
        value: 'name'
    },
    {
        value: 'created_at'
    }
    // {
    //     render: function (data) {
    //         return data['name']
    //     }
    // },
    // {
    //     render: function (data) {
    //         // console.log(data);
    //         return (<BaseAction onEdit={() => { myClass.handleEdit(data) }} />)
    //         // console.log(data);
    //     }
    // },
];

const mapStateToProps = (state) => ({
    division: state.reducer.division
})

const mapDispatchToProps = { getData, createData, patchData, deleteData, resetError, resetSuccess }


export default connect(mapStateToProps, mapDispatchToProps)(Division)