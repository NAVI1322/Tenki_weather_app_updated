

import { InputBox } from './InputBox'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import logo from "../imgs/logo/logo.jpeg";


export function Appbar() {
  const [Menu, Setmenu] = useState(true);
  

  return (
    <div className='flex flex-row items-center justify-start'  >
      <div>
        <FaSearch />
      </div>
      <div className="flex items-center">
      <InputBox />
      <div className="md:hidden pr-6 cursor-pointer flex justify-end" onClick={() => Setmenu(!Menu)}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>

      </div>
      </div>

      <div className={!Menu ? 'fixed left-0 top-0  w-[80%] cursor-pointer  bg-white h-screen border-y border-4 font-mono ease-in-out duration-1000' : 'fixed left-[-100%] top-0  w-[60%]  border-r bg-slate-200 border-r-slate-400 h-full ease-in-out duration-700 font-mono'}>
          <div className='flex justify-end p-10' onClick={() => Setmenu(!Menu)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 mb-20">
        <img src={logo} alt="" className="max-w-70 rounded-full" />
        <div className="text-3xl font-bold ">Tenki</div>
      </div>
        <ul className="flex flex-col justify-center" >
          <li className='border-b border-3 hover:bg-blue-100 ease-in-out duration-300 cursor-pointer w-full text-center'>Home</li>
          <li className='border-b border-3 hover:bg-blue-100 ease-in-out duration-300 cursor-pointer w-full text-center'>Contact</li>
          <li className=' hover:bg-blue-100 ease-in-out duration-300 cursor-pointer w-full text-center'>Team</li>
        </ul>
      </div>


    </div>
  )
}
