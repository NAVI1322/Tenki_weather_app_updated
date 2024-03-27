import logo  from '../imgs/logo/logo.png'

export function Appbar()
{

    return (
    <div className="  flex justify-between shadow-lg container items-center">
        <div className="max-w-48">
            <img src={logo} alt="logo" />
        </div>

        <div className=' items-center font-mono md:flex md:flex-row hidden space-x-10 '>
            <a href="">Contact</a>
            <a href="">Team</a>
        </div>

        <div className='font-bold text-xl font-mono pr-10 md:text-2xl'>
           <h3>Welcome <span className='text-blue-300'>friend</span>,</h3>
        </div>
    </div>)
}