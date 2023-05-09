import React, { Component } from 'react'

class AddUser extends Component {
    render() {
        return (
            <div>
                <div className='w-full rounded-md bg-white shadow-md'>
                    <div className='h-1 w-full bg-green-500 rounded-t-md'></div>
                    <div className='px-4 py-4'>
                        <p className='text-gray-600 text-sm'>Add User</p>
                        <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser
