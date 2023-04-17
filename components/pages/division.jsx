import React, { Component } from 'react'
import Modal from '../modal/modal'
import ModalAlert from '../modal/alert'
import Textfield from '../forms/textfield'

export class Division extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            error: false,
            name: ''
        }
    }
    render() {
        return (
            <div>
                <div className='flex items-center justify-between'>
                    <div className='breadcrumb'></div>
                    <button
                        onClick={() => { this.setState({ isModalOpen: true }) }}
                        type='button'
                        className='flex items-center text-sm rounded-md py-2 px-6 text-white bg-green-500 hover:bg-green-600 transition-colors ease-in duration-200'
                    >
                        <span className="material-symbols-outlined me-2">
                            add_circle
                        </span>
                        <span>Add Item</span>
                    </button>
                </div>
                <Modal title='Add Item' isOpen={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
                    <Textfield id='name' placeholder='name' value={this.state.name} onChange={(e) => { this.setState({ [e.target.id]: e.target.value }) }} />
                    <div className='flex justify-end mt-3'>
                        <button
                            onClick={() => { this.setState({ error: true }) }}
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
                <ModalAlert isOpen={this.state.error} onClose={() => { this.setState({ error: false }) }}>

                </ModalAlert>
            </div>
        )
    }
}

export default Division