import { useState } from 'react'
import logo  from '../imgs/logo/logo.png'
import { Link } from 'react-router-dom'


export function Appbar()
{

    const [Menu,Setmenu] = useState(true)

    return (
    <div className="  flex justify-between shadow-lg container items-center">
        <div className="max-w-48">
            <img src={logo} alt="logo" />
        </div>

        <div className=' items-center font-mono md:flex md:flex-row hidden space-x-10   '>
           <Link to="/contact">Contact</Link>
           <Link to="/team">Team</Link>
        </div>

        <div className='font-bold text-xl font-mono md:text-2xl pr-10'>
           <h3>Welcome <span className='text-blue-300'>friend</span>,</h3>
        </div>

      <div className="md:hidden pr-6 cursor-pointer" onClick={()=>Setmenu(!Menu)}>
        {!Menu 
        ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
         :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>}

      </div>

      <div className={!Menu?'fixed left-0 top-0  w-[80%] cursor-pointer bg-slate-100 h-screen border-y border-4 font-mono ease-in-out duration-700':'fixed left-[-100%] top-0  w-[60%]  border-r bg-slate-200 border-r-slate-400 h-full ease-in-out duration-700 font-mono'}>
       <div className='font-bold text-3xl mt-48 mb-10 bg-blue-50'>
                Weather App
       </div>
            <ul className="">
                <li className='border-b border-3 hover:bg-blue-100'>Contact</li>
                <li className=' hover:bg-blue-100'>Team</li>
            </ul>
      </div>
       
    </div>)
}