import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment } from '../../redux/features/counterSlice'

export class Dashboard extends Component {

  componentDidMount () {
    console.log(this.props.count);
  }
  render() {
    return (
      <div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='h-40 bg-slate-300 rounded-lg shadow-md animate-pulse'></div>
          <div className='h-40 bg-white rounded-lg shadow-md'></div>
          <div className='h-40 bg-white rounded-lg shadow-md'></div>
        </div>
        <div className='mt-3'>
          <button onClick={() => this.props.increment()}>Click</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.reducer.counter.count
})

const mapDispatchToProps = { increment }
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)