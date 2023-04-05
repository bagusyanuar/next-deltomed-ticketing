import React, { Component } from 'react';
import Sidebar from '../navigation/sidebar';

class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
        return (
            <>
                <Sidebar/>
            </>
        )
    }
}

export default Dashboard
