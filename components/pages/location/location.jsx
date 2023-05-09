import React, { Component } from 'react'
import BaseButton from '../../forms/button'
import ButtonWithLoading from '../../forms/button/with-loading'
import Textfield from '../../forms/textfield'
import TableClient from '../../table/client/index'
import TableAction from '../../table/components/action';
import Modal from '../../modal/modal'
import ModalAlert from '../../modal/alert'
import ModalConfirmation from '../../modal/confirmation'
import BlockLoader from '../../loader/block'

//redux import part
import { connect } from 'react-redux'
import { sort, reset } from '../../../redux/features/location/slice'
import { getData, create, patch, destroy } from '../../../redux/features/location/action'

export class Location extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            modalConfirmation: false,
            id: '',
            name: '',
            tableHeader: [],
            tableColumn: [],
            typeCreate: 'create',
        }
    }

    renderAction = (data) => {
        return <TableAction onEdit={() => { this.handleEdit(data) }} onDelete={() => { this.handleDelete(data['id']) }} />
    }

    async componentDidMount() {
        this.setState({
            tableHeader: [
                {
                    value: 'Nama',
                    className: '',
                    sort: true
                },
                {
                    value: 'Action',
                    className: 'w-3 text-center',
                },
            ],
            tableColumn: [
                {
                    value: 'name',
                },
                {
                    value: null,
                    render: this.renderAction
                }
            ]
        })
        await this.props.getData({ token: this.props.token, limit: 100, offset: 0 })

    }

    handleEdit = (data) => {
        this.setState({
            modalOpen: true,
            typeCreate: 'patch',
            id: data['id'],
            name: data['name']
        })
    }

    handleSave = async () => {
        const data = { name: this.state.name }
        if (this.state.typeCreate === 'patch') {
            await this.props.patch({
                token: this.props.token, id: this.state.id, data: JSON.stringify(data)
            })
        } else {
            await this.props.create({
                token: this.props.token, data: JSON.stringify(data)
            })
        }
    }

    handleDelete = (id) => {
        this.setState({
            modalConfirmation: true,
            id: id,
            typeCreate: 'delete'
        })
    }

    delete = async () => {
        this.setState({
            modalConfirmation: false
        })
        await this.props.destroy({ token: this.props.token, id: this.state.id })
    }

    onSuccess = async () => {
        this.props.reset([{ state: 'success', value: false }])
        await this.props.getData({ token: this.props.token, limit: 100, offset: 0 })
        this.setState({ name: '', id: '', modalOpen: this.state.typeCreate === 'create' ? true : false })
    }

    render() {
        return (
            <div>
                <div className='flex items-center justify-between'>
                    <div className='breadcrumb'>
                    </div>
                    <BaseButton onClick={() => { this.setState({ modalOpen: true }) }}>
                        <span className="material-symbols-outlined me-2">
                            add_circle
                        </span>
                        <span>Add Item</span>
                    </BaseButton>
                </div>
                <div className='w-full rounded-md bg-white shadow-md'>
                    <div className='h-1 w-full bg-green-500 rounded-t-md'></div>
                    <div className='px-4 py-4'>
                        <p className='text-gray-600 text-sm'>Data Location</p>
                        <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                        <TableClient
                            headers={this.state.tableHeader}
                            pageLength={[5, 10, 20]}
                            withIndex={true}
                            data={this.props.location.data}
                            pagination={true}
                            onSorted={(data) => { this.props.sort(data) }}
                            column={this.state.tableColumn}
                        />
                    </div>
                </div>
                <Modal title='Add Location' isOpen={this.state.modalOpen} onClose={() => { this.setState({ modalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <ButtonWithLoading onClick={() => { this.handleSave() }} isLoading={(this.props.location.isLoading && (this.props.location.type === 'CREATE' || this.props.location.type === 'PATCH'))}>
                            <>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                <span>Save</span>
                            </>
                        </ButtonWithLoading>
                    </div>
                </Modal>
                <ModalConfirmation isOpen={this.state.modalConfirmation} message='Yakin ingin menghapus?' onRejected={() => { this.setState({ modalConfirmation: false }) }} onAccepted={() => { this.delete() }} />
                <BlockLoader isOpen={(this.props.location.isLoading && this.props.location.type === 'DELETE')} message='sedang menghapus data....' />
                <ModalAlert type='error' isOpen={(this.props.location.error && this.props.location.type !== 'FETCH')} callback={() => { this.props.reset([{ state: 'error', value: false }]) }} message={`internal server error`} />
                <ModalAlert type='success' isOpen={(this.props.location.success && this.props.location.type !== 'FETCH')} callback={() => { this.onSuccess() }} message={`success`} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.reducer.location
})

const mapDispatchToProps = { getData, create, patch, destroy, sort, reset }

export default connect(mapStateToProps, mapDispatchToProps)(Location)