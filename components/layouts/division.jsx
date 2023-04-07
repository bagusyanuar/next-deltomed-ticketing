import React, { Component } from 'react'
import Sidebar from '../navigation/sidebar';
import Navbar from '../navigation/navbar';

export class Division extends Component {
    render() {
        return (
            <div className='flex'>
                <Sidebar />
                <div className='grow bg-base'>
                    <Navbar />
                    <div className='content px-8'>
                        <p className='font-bold text-3xl mb-3'>Division</p>
                        <div className='bg-white rounded-lg shadow-md w-full p-5'>
                            <div className='flex items-center'>
                                <p className='grow font-bold text-sm text-slate-600'>Data Divisi</p>
                                <button
                                    type='button'
                                    className='flex items-center text-sm bg-primary rounded-md py-2 px-6 text-white'>
                                    <span class="material-symbols-outlined me-2">
                                        add_circle
                                    </span>
                                    Tambah
                                </button>
                            </div>
                            <div className='border-b border-slate-300 mt-3 mb-3'>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Division