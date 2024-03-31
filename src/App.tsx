import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";

import {
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

function useWeatherData() {
  const inputBoxValue = useRecoilValue(textState);
  const setCurrentData = useSetRecoilState(currentState);
  const setHourlyData = useSetRecoilState(hourlyState);
  const setForecastData = useSetRecoilState(climateState);

  useEffect(() => {
    currentWeather(inputBoxValue).then((data: any) => {
      setCurrentData(data);
    });
    HourlyWeather(inputBoxValue).then((data: any) => {
      setHourlyData(data);
    });
    forecastWeather(inputBoxValue).then((data: any) => {
      setForecastData(data);
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
