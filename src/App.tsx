import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";
import logo from "./imgs/logo/logo.jpeg";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import {
  textState,
  currentState,
  hourlyState,
  climateState
} from "./atom/globalState";

import {
  currentWeather,
  HourlyWeather,
  forecastWeather,
  WeatherData,
  HourlyData,
  ClimateData
} from "./services/weatherData"

import { Appbar } from "./components/AppBar";
import { Loading } from "./atom/loading";




function useWeatherData() {


  const [_,setLocation] = useRecoilState(Loading)
  const inputBoxValue = useRecoilValue(textState);
  const setCurrentData = useSetRecoilState(currentState);
  const setHourlyData = useSetRecoilState(hourlyState);
  const setForecastData = useSetRecoilState(climateState);
 

  useEffect(() => {
    currentWeather(inputBoxValue).then((data: any) => {
      setCurrentData(data);
      setLocation(false)
      
    });
    HourlyWeather(inputBoxValue).then((data: any) => {
      setLocation(true)
      setHourlyData(data);
      setLocation(false)
    });
    forecastWeather(inputBoxValue).then((data: any) => {
      setLocation(true)
      setForecastData(data);
      setLocation(false)
    });
  }, [inputBoxValue, setCurrentData, setHourlyData, setForecastData]);
}

function App() {

  useWeatherData()
  const loading = useRecoilValue(Loading);
  const currentData = useRecoilValue<WeatherData | null>(currentState)
  const hourlyData = useRecoilValue<HourlyData | null>(hourlyState)
  const climateData = useRecoilValue<ClimateData | null>(climateState)

  return (
    <div className="flex flex-col md:flex-row lg:space-x-10 sm:space-x-10 h-screen ">
  <div className="hidden lg:flex">
  <DashBoard /> 
  </div>
    {loading ? (
        // Render skeleton loader while loading
        <div className='flex justify-center items-center space-x-1 flex-grow'>
            <span className='sr-only '>Loading...</span>
            <div className='h-8 w-8 md:h-16 md:w-16 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 md:h-16 md:w-16 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 md:h-16 md:w-16 bg-slate-300 rounded-full animate-bounce'></div>
        </div>
    ) : (
        <div className="flex flex-col justify-center md:flex-row md:justify-between flex-grow">
            <div className="flex flex-col justify-center space-y-10 w-full mr-10">
                <div className="md:hidden ml-5 mt-5" > 
                  <img src={logo} alt="" className="max-w-70 rounded-full" />
                  <div className="text-3xl font-bold">Tenki</div>
                </div>
                <Appbar />
                <CurrentCard currentData={currentData} />
                <GridItems climateData={climateData} />
            </div>
            <div className="flex" >
                <RightCard hourlyData={hourlyData} climateData={climateData} currentData={currentData} />
            </div>
        </div>
    )}
</div>


  );
} 

export default App;
