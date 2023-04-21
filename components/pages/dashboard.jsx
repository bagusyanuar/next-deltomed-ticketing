import React, { Component } from 'react'

export class Dashboard extends Component {

  componentDidMount () {
  }
  render() {
    return (
      <div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='h-40 bg-slate-300 rounded-lg shadow-md animate-pulse'></div>
          <div className='h-40 bg-white rounded-lg shadow-md'></div>
          <div className='h-40 bg-white rounded-lg shadow-md'></div>
        </div>
      </div>
    )
  }
}

export default Dashboard