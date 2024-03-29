
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { textState } from '../atom/inputfields'
import { useState } from "react";


export function InputBox() {
  const [input, setInput] = useState("")
  const [text, setText] = useRecoilState(textState);

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setText(input)
  }

  return <div className=''>
    <div className="relative">
      <input type="text" className=' p-3 w-96  text-left' onChange={handleChange} placeholder='Search your city..' />
      <button className="absolute  inset-y-0 right-0 px-4 py-2 bg-slate-400 text-white" onClick={handleSubmit} >
        Search
      </button>
    </div>
  </div>

}
