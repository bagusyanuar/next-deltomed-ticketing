import Head from 'next/head'
import Image from 'next/image'

import Login from '../components/layouts/login'

export default function Home() {
  return (<Login/>)
}
{/* <> */}
    //   <div className='flex h-screen flex-row'>
    //     <div className='basis-1/2 bg-primary flex justify-center items-center'>
    //       <Image src="/assets/diagram.png" width={300} height={300} alt="diagram image"/>
    //     </div>
    //     <div className='basis-1/2 flex justify-center items-center p-20'>
    //       <div className='h-full w-full'>
    //         <div className='flex mb-10'>
    //           <Image src="/assets/logo.png" width={30} height={10} alt="logo"/>
    //           <p className='font-bold ms-1'>PT.Deltomed</p>
    //         </div>
    //         <div className='mb-5'>
    //         <p className='font-bold text-2xl mb-2'>Log in to your Account</p>
    //         <p className='text-slate-500 text-sm'>Welcome back! Select method to log in</p>
    //         </div>
    //         <label className="relative text-gray-400 focus-within:text-gray-600 block">

    //         <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-1/ left-3">
    //           mail
    //           </span>

    //           <input type="email" name="email" id="email" placeholder="email@kemuscorp.com" className="form-input rounded-md border border-slate-600 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none" />
    //         </label>
            
    //       </div>
    //     </div>
    //   </div>
    // </>