import React, { Component } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import axios from 'axios';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    try {
      this.setState({
        isLoading: true
      })
      await axios.post('/api/login', data);
      Router.push("/dashboard");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      this.setState({
        isLoading: false
      })
    }

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
                // disabled={true}
                onChange={this.onHandleChange}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="disabled:bg-slate-200 text-sm form-input rounded-md border border-slate-400 py-1 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-8 focus:outline-none focus:border-slate-500" />
            </label>
            <div className='text-end'>
              <button
                disabled={this.state.isLoading}
                onClick={this.handleSubmit}
                type='button'
                className='text-sm w-1/3 bg-primary rounded-md py-1 px-3 text-white'>
                <div className='flex content-center'>
                  {
                    this.state.isLoading ? <svg className='animate-spin h-5 w-5 mr-2' viewBox='0 0 24 24'>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : ''
                  }
                  <span className='w-full'>Login</span>
                </div>

              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Login;
