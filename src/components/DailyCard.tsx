import { useEffect, useState } from "react";
import { forecastWeather } from "../services/weatherData";
import { ClimateData } from "../services/weatherData";

const fetchIcon = (code: string) => {
  return <img src={`https://openweathermap.org/img/wn/${code}@2x.png`} alt="Icon" className=" h-[60px] w-[60px] " />

}

export const DailyCard = () => {
  const [climateData, setClimateData] = useState<ClimateData | null>(null);

  useEffect(() => {
    forecastWeather("Mississauga").then((data) => {
      if (data) {
        console.log(data);
        setClimateData(data);
      }
    });
  }, []);
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
    <div className="text-black w-[560px] h-[577px] items-start flex flex-col ">
      <p className=" ml-3 ">7-Days Forecast</p>
      <div className="w-[560px] h-[577px] bg-slate-400 p-2 rounded-2xl">
        {climateData && (
          <div className="flex flex-col gap-6 ">
            {climateData.list.map((day: any, index: number) => (
              <div key={index} className="flex justify-between from-blue-800 bg-gradient-to-r to-blue-950 rounded-xl text-white font-medium">
                <p className="flex items-center pl-4">{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today" : dayNames[new Date(day.dt * 1000).getDay()]}</p>
                <p className="flex items-center flex-row">{day.weather[0].description}{fetchIcon(day.weather[0].icon)}</p>
                <p className="flex items-center pr-4">
                  {Math.floor(day.temp.max)}°/ {Math.floor(day.temp.min)}°C
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
