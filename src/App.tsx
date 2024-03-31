import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";

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
import { LoadingElement } from "./components/Loading";



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
    <div className="flex flex-col md:flex-row md:space-x-20 h-screen">
    <DashBoard /> 
    {loading ? (
        // Render skeleton loader while loading
        <div className='flex justify-center items-center flex-grow'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 md:h-3 md:w-3 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 md:h-3 md:w-3 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 md:h-3 md:w-3 bg-slate-300 rounded-full animate-bounce'></div>
        </div>
    ) : (
        <div className="flex flex-col justify-center md:flex-row md:justify-between flex-grow">
            <div className="flex flex-col justify-center space-y-10 md:w-1/2">
                <Appbar />
                <CurrentCard currentData={currentData} />
                <GridItems climateData={climateData} />
            </div>
            <div className="flex justify-center md:w-1/2">
                <RightCard hourlyData={hourlyData} climateData={climateData} currentData={currentData} />
            </div>
        </div>
    )}
</div>


  );
} 

export default App;
