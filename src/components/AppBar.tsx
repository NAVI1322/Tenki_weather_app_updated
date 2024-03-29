import logo from '../imgs/logo/logo.png'
import { Link } from 'react-router-dom'
import { InputBox } from './InputBox'
import { FaSearch } from 'react-icons/fa'


export function Appbar() {

  return (
    <div className='flex flex-row items-center gap-4 h-24 p-8'>
      <FaSearch />
      <InputBox />
    </div>
  )
}
