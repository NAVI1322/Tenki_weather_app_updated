import Axios from "axios";
import { useEffect, useState } from "react";

interface WeatherData {
  list: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      description: string;
      icon:string ;
    }[];
  }[];
}
const fetchData = async (city: string, country: string) => {
  try {
    const response = await Axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&units=metric&cnt=7&appid=52def1b8901136ca6d6d9ca28e02e948`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
    return null;
  }
};
const fetchIcon = (code:string) => {
  return <img src={`https://openweathermap.org/img/wn/${code}@2x.png`} alt="Icon" className=" h-[60px] w-[60px] " />
}
export const DailyCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchData("Mississauga", "CA").then((data) => {
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
              <div key={index} className="flex justify-between from-blue-800 bg-gradient-to-r to-blue-950 rounded-xl text-white font-medium">
                <p className="flex items-center pl-4">{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today": dayNames[new Date(day.dt * 1000).getDay()] }</p>
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
