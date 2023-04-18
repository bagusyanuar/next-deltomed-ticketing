import React, { Component } from 'react';
import Navigation from '../navigation';
import Layout from './index'
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className='fixed left-0 h-screen w-[280px] bg-blue-600'></div>
                <div className='w-full h-screen pl-[280px]'>abcd</div>
            </div>
            // <Layout title="Dashboard">
            //     <div className='grid grid-cols-3 gap-6'>
            //         <div className='h-40 bg-slate-300 rounded-lg shadow-md animate-pulse'></div>
            //         <div className='h-40 bg-white rounded-lg shadow-md'></div>
            //         <div className='h-40 bg-white rounded-lg shadow-md'></div>
            //     </div>
            // </Layout>
        )
    }
}


export default Dashboard
