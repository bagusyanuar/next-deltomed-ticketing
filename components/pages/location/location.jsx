import React, { Component } from 'react'
import BaseButton from '../../forms/button'
import ButtonWithLoading from '../../forms/button/with-loading'
import Textfield from '../../forms/textfield'
import TableClient from '../../table/client/index'
import TableAction from '../../table/components/action';
import Modal from '../../modal/modal'

//redux import part
import { connect } from 'react-redux'
import { sort } from '../../../redux/features/location/slice'
import { getData, create } from '../../../redux/features/location/action'

export class Location extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            name: '',
            tableHeader: [],
            tableColumn: [],
            typeCreate: 'create',
        }
    }

    renderAction = (data) => {
        return <TableAction onEdit={() => {  }} onDelete={() => {}} />
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

    handleSave = async () => {
        if (this.state.typeCreate === 'patch') {
            // await this.props.patchData({
            //     AxiosInstance, id: this.state.id, data: JSON.stringify(data)
            // })
        } else {
            await this.props.create({
                token: this.props.token, data: JSON.stringify(data)
            })
        }
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
                        <ButtonWithLoading onClick={() => { this.handleSave }} isLoading={(this.props.location.isLoading && this.props.location.type === 'CREATE')}>
                            <>
                                <span className="material-symbols-outlined me-1">
                                    check
                                </span>
                                <span>Save</span>
                            </>
                        </ButtonWithLoading>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.reducer.location
})

const mapDispatchToProps = { getData, create, sort }

export default connect(mapStateToProps, mapDispatchToProps)(Location)