
import { useRecoilState } from "recoil";
import { textState } from '../atom/inputfields'
import { useState } from "react";


export function InputBox() {
  const [input, setInput] = useState("")
  const [_, setText] = useRecoilState(textState);

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setText(input)
  }

  const handleClick = (event: any) => {
    if (event.key == "Enter") {
      handleSubmit()
    }
  }

  return <div className=''>
    <div className="relative">
      <input type="text" className='outline-none p-3 w-96  text-left' onKeyDown={handleClick} onChange={handleChange} placeholder='Search your city..' />
    </div>
  </div>

}
