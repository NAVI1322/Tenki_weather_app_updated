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

  const currentData = useRecoilValue<WeatherData | null>(currentState)
  const hourlyData = useRecoilValue<HourlyData | null>(hourlyState)
  const climateData = useRecoilValue<ClimateData | null>(climateState)

  return (
    <div className=" flex ">
      <DashBoard />
      <div className="md:flex flex-col md:flex-row ">
        <div className="flex flex-col justify-center items-center ">
          <Appbar />
          <CurrentCard currentData={currentData} />
          <GridItems climateData={climateData} />
        </div>
        <div className="flex justify-center">
          <RightCard hourlyData={hourlyData} climateData={climateData} currentData={currentData} />
        </div>
      </div>
    </div>
  );
}

export default App;
