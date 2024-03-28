import { useState } from "react"


export function InputBox()
{
    const [inputValue,setInputValue] = useState<string>("")

    const handleChange = (event:any) => {
        setInputValue(event.target.value);
      };

      const handleSubmit = () => {
        
      }

    return  <div className='font-bold font-mono pr-10 '>
    <div className="relative">
      <input type="text" className='ring-gray-500 p-3 w-48 md:w-96 border-4 text-left  focus:ring-2 outline-none rounded' onChange={handleChange} placeholder='Your city' />
      <button className="absolute inset-y-0 right-0 px-4 py-2 bg-slate-400 text-white font-semibold "  onClick={handleSubmit}>
        Search
      </button>
    </div>
  </div>
  
}