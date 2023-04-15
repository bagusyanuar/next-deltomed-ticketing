import React, { Component } from 'react';
import Navigation from '../navigation';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Navigation title="Dashboard">
                <div className='grid grid-cols-3 gap-6'>
                    <div className='h-40 bg-slate-300 rounded-lg shadow-md animate-pulse'></div>
                    <div className='h-40 bg-white rounded-lg shadow-md'></div>
                    <div className='h-40 bg-white rounded-lg shadow-md'></div>
                </div>
            </Navigation>
        )
    }
}


export default Dashboard
