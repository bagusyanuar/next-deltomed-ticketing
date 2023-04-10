import React, { Component } from 'react';
import Sidebar from '../navigation/sidebar';
import Navbar from '../navigation/navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='flex'>
                <Sidebar />
                <div className='grow bg-base'>
                    <Navbar title="Overview" />
                    <div className='content px-8'>
                        {/* <p className='font-bold text-3xl mb-3'>Overview</p> */}
                        <div className='grid grid-cols-3 gap-6'>
                            <div className='h-40 bg-slate-300 rounded-lg shadow-md animate-pulse'></div>
                            <div className='h-40 bg-white rounded-lg shadow-md'></div>
                            <div className='h-40 bg-white rounded-lg shadow-md'></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Dashboard
