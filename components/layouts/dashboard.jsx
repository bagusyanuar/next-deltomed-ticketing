import React, { Component } from 'react';
import Sidebar from '../navigation/sidebar';

class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
        return (
            <div className='flex'>
                <Sidebar/>
                <div className='grow bg-primary'></div>
            </div>
        )
    }
}

export default Dashboard
