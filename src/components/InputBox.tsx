
import { useRecoilState, useRecoilValue, useResetRecoilState   } from "recoil";
import { textState } from '../atom/inputfields'
import { useState } from "react";


export function InputBox()
{
  const [input,setInput]= useState("")
  const [text , setText] = useRecoilState(textState);
 
    const handleChange = (event:any) => {
        setInput(event.target.value);
      };
    
    const handleSubmit =() =>{
      setText(input)
    }
      
    return  <div className='font-bold  pr-10 '>
    <div className="relative">
      <input type="text" className='ring-gray-500 p-3 w-56 md:w-96 border-4 text-left  focus:ring-2 outline-none rounded'  onChange={handleChange} placeholder='Your city' />
      <button className="absolute  inset-y-0 right-0 px-4 py-2 bg-slate-400 text-white font-semibold focus:ring-2 ring-gray-500" onClick={handleSubmit} >
        Search
      </button>
    </div>
  </div>
  
}