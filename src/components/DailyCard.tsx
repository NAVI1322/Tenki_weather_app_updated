import { useEffect, useState } from "react";
import { forecastWeather } from "../services/weatherData";
import { WeatherData } from "../services/weatherData";

export const DailyCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    forecastWeather("Mississauga").then((data) => {
      if (data) {
        console.log(data);
        setWeatherData(data);
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
        {weatherData && (
          <div className="flex flex-col gap-6 ">
            {weatherData.list.map((day: any, index: number) => (
              <div key={index} className="flex justify-between bg-green-300 rounded-xl p-4">
                <p>{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today" : dayNames[new Date(day.dt * 1000).getDay()]}</p>
                <p>{day.weather[0].description}</p>
                <p>
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
