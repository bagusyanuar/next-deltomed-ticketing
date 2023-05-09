import React, { Component } from 'react'
import BaseButton from '../../forms/button'
import TableClient from '../../table/client/index'
import TableAction from '../../table/components/action';
import Modal from '../../modal/modal'
import Textfield from '../../forms/textfield'
import PasswordField from '../../forms/password'
import SelectCustom from '../../forms/select'
import ButtonWithLoading from '../../forms/button/with-loading'
import Router from 'next/router'

//redux import part
import { connect } from 'react-redux'
import { sort, reset } from '../../../redux/features/user/slice'
import { getData, create, patch, destroy } from '../../../redux/features/user/action'

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            name: '',
            password: '',
            tableHeader: [],
            tableColumn: [],
            roleOptions: [],
        }
    }

    renderAction = (data) => {
        return <TableAction onEdit={() => { }} onDelete={() => { }} />
    }

    async componentDidMount() {
        this.setState({
            tableHeader: [
                {
                    value: 'Email',
                    className: '',
                    sort: true
                },
                {
                    value: 'Username',
                    className: '',
                    sort: true
                },
                {
                    value: 'Division',
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
                    value: 'email',
                },
                {
                    value: 'username',
                },
                {
                    value: null,
                    render: function (data) {
                        let value = '-'
                        if (data['division'] !== null) {
                            value = data['division']['name']
                        }
                        return value
                    }
                },
                {
                    value: null,
                    render: this.renderAction
                }
            ],
            roleOptions: [
                {
                    value: 'administrator',
                    text: 'Administrator'
                },
                {
                    value: 'manager',
                    text: 'Manager'
                },
            ]
        })
        await this.props.getData({ token: this.props.token, limit: 100, offset: 0 })
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
                        <p className='text-gray-600 text-sm'>Data User</p>
                        <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                        <TableClient
                            headers={this.state.tableHeader}
                            pageLength={[5, 10, 20]}
                            withIndex={true}
                            data={this.props.user.data}
                            pagination={true}
                            onSorted={(data) => { this.props.sort(data) }}
                            column={this.state.tableColumn}
                        />
                    </div>
                </div>
                <Modal title='Add User' size='lg' isOpen={this.state.modalOpen} onClose={() => { this.setState({ modalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' className='mb-3' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <PasswordField id='password' placeholder='password' className='mb-3' value={this.state.password} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <SelectCustom id='roles' name='roles' placeholder='--pilih hak akses--' data={this.state.roleOptions} />
                    <div className='flex justify-end mt-3'>
                        <ButtonWithLoading onClick={() => { }} isLoading={true}>
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
    user: state.reducer.user
})

const mapDispatchToProps = { getData, create, patch, destroy, sort, reset }


export default connect(mapStateToProps, mapDispatchToProps)(User)