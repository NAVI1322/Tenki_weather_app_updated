
import { useEffect, useState } from "react"
import { HourlyData, HourlyWeather, fetchIcon ,  forecastWeather} from "../services/weatherData"
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { ClimateData } from "../services/weatherData";



export function RightCard()
{
  const [hourlyData, sethourlyData] = useState<HourlyData | null>(null)
  const inputBoxValue = useRecoilValue(textState)
  const [climateData, setClimateData] = useState<ClimateData | null>(null);


  useEffect(() => {
    forecastWeather(inputBoxValue).then((data) => {
      if (data) {
        setClimateData(data);
        console.log(data)
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


  useEffect(() => {
    HourlyWeather(inputBoxValue).then((data) => {
      if (data) {
        sethourlyData(data)
      }
    })
  }, [inputBoxValue])
  console.log(hourlyData)

  function formatAMPM(date: Date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = hours + ampm;
    return strTime;
  }

    return (
  
     <div className=" md:border-l-2  flex flex-col max-w-md items-center pl-5 ">
        <div className="mb-10 text-center">
          This Week
        </div>
        <div className="font-bold flex items-start text-xlmax-w-md">Today</div>
        
        <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 max-w-md bg-white mt-5 " >

      {hourlyData && (
        <>
          {hourlyData.list.map((hour: any, index: number) => (
            <div
            key={index}
            className="flex flex-col justify-between p-4 bg-gradient-to-r from-gray-300 to-blue-100 rounded-md shadow-m  font-medium"
          >
            <div className="text-lg text-center mb-2 pr-6 pl-6">
              {formatAMPM(new Date(hour.dt * 1000))}
            </div>
            <div className="text-center mb-2 ">
              {fetchIcon(hour.weather[0].icon)}
            </div>
            <div className="text-xl text-center pr-6 pl-6">
              {Math.round(hourlyData.list[index].main.temp)}°C
            </div>
          </div>
          
          ))}
        </>
      )}

    </div>

    <div className="text-black flex flex-col  w-full mt-5">
      <div className=" rounded-2xl">
        {climateData && (
          <div className="flex flex-col space-y-4 ">
            {climateData.list.map((day: any, index: number) => (
              <div key={index} className="flex justify-between rounded-xl font-medium space-x-24 m-1 shadow-inner ">
                <div className="flex items-center p-4">{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today" : dayNames[new Date(day.dt * 1000).getDay()]}</div>
                <div className="flex justify-center items-center">
                  {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°C
                  <div>{fetchIcon(day.weather[0].icon)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>


  </div>
  
    )
}