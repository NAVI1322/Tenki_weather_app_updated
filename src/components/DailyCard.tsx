import { useEffect, useState } from "react";
import { forecastWeather } from "../services/weatherData";
import { ClimateData } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";


export const fetchIcon = (code: string) => {
  return <img src={`https://openweathermap.org/img/wn/${code}@2x.png`} alt="Icon" className=" h-[60px] w-[60px] " />

}

export const DailyCard = () => {


  const [climateData, setClimateData] = useState<ClimateData | null>(null);

  const inputBoxValue = useRecoilValue(textState)
  

  useEffect(() => {
    forecastWeather(inputBoxValue).then((data) => {
      if (data) {
        
        setClimateData(data);
      }
    });
  }, [inputBoxValue]);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = new Date().getDay();

  return (
    <div className="text-black flex flex-col bg-slate-200 font-mono shadow-lg">
      <p className=" p-2 bg-slate-400 w-full text-center">7-Days Forecast</p>
      <div className=" rounded-2xl p-2">
        {climateData && (
          <div className="flex flex-col gap-3 ">
            {climateData.list.map((day: any, index: number) => (
              <div key={index} className="flex justify-between rounded-xl text-white font-medium space-x-24 m-1 border-b bg-slate-400 ">
                <p className="flex items-center pl-4">{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today" : dayNames[new Date(day.dt * 1000).getDay()]}</p>
                <p className="flex items-center flex-row">{day.weather[0].description}{fetchIcon(day.weather[0].icon)}</p>
                <p className="flex items-center pr-4">
                  {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°C
                </p>
              </div>
            ))}
          </div> 
        )}
      </div>
    </div>
  );
};
