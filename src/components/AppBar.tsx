import { InputBox } from "./InputBox";
import { WeatherData, ClimateData } from "../services/weatherData";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa'
import logo from "../imgs/logo/logo.jpeg";
import { useNavigate } from 'react-router-dom';

export function AppBar() {
  const [Menu, Setmenu] = useState(true);
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ClimateData | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl shadow-cartoon">
      <div className="flex-1">
        <InputBox
          setWeatherData={setWeatherData}
          setForecastData={setForecastData}
          setLoading={setLoading}
        />
      </div>

      <div className="md:hidden pr-6 cursor-pointer" onClick={() => Setmenu(!Menu)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </div>

      <div className={!Menu ? 'fixed left-0 top-0  w-[100%] cursor-pointer bg-blue-50 h-screen border-y border-4 font-mono ease-in-out duration-700' : 'fixed left-[-100%] top-0  w-[60%]  border-r bg-blue-50 border-r-slate-400 h-full ease-in-out duration-700 font-mono'}>
        <div className="flex justify-end p-6" onClick={() => Setmenu(!Menu)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg></div>
        
        <div className="flex items-center justify-center  gap-4 mb-20"> 
          <img src={logo} alt="" className="max-w-70 rounded-full" />
          <div className="text-3xl font-bold">Tenki</div>
        </div>
        <ul className="flex flex-col items-center " >
          <li className='border-b border-3 hover:bg-blue-100 w-full text-center text-xl' onClick={()=>navigate('/')}>Dashboard</li>
          <li className=' hover:bg-blue-100 w-full text-center text-xl' onClick={()=>navigate('/team')}>Team</li>
        </ul>
      </div>
    </div>
  );
}
