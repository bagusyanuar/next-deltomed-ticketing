import React, { Component } from 'react'
import Image from 'next/image'
import Router from 'next/router'


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onHandleChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(id, value);
  }

  handleSubmit = () => {
    console.log(this.state.username);
    Router.push("/dashboard");
  }
  render() {
    return (
      <div className='h-screen bg-primary flex justify-center items-center'>
        <div className='sm:w-1/3 md:w-1/5 h-1/3 bg-slate-50 rounded-md px-5 py-5 shadow-md'>
          <div className='flex items-center justify-center mb-6'>
            <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
            <p className='font-bold ms-1'>PT.Deltomed</p>
          </div>
          <div id='form'>
            <label className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
              <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-1.5 left-3 text-sm">
                person
              </span>
              <input
                onChange={this.onHandleChange}
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="text-sm form-input rounded-md border border-slate-400 py-1 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-8 focus:outline-none focus:border-slate-500" />
            </label>
            <label className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
              <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-1.5 left-3 text-sm">
                lock
              </span>
              <input
                disabled={true}
                onChange={this.onHandleChange}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="disabled:bg-slate-200 text-sm form-input rounded-md border border-slate-400 py-1 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-8 focus:outline-none focus:border-slate-500" />
            </label>
            <div className='text-end'>
              <button
                onClick={this.handleSubmit}
                type='button'
                className='text-sm w-1/3 bg-primary rounded-md py-1 text-white'>Login</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Login;
