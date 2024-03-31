
import { useEffect, useState } from "react"
import { HourlyData, HourlyWeather, WeatherData, currentWeather, fetchIcon, forecastWeather } from "../services/weatherData"
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { ClimateData } from "../services/weatherData";



export function RightCard() {
  const [hourlyData, sethourlyData] = useState<HourlyData | null>(null)
  const inputBoxValue = useRecoilValue(textState)
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);


  useEffect(() => {
    forecastWeather(inputBoxValue).then((data) => {
      if (data) {
        setClimateData(data);
        console.log(data)
      }
      currentWeather(inputBoxValue).then((data) => {
        setCurrentData(data);
        console.log(data);
      })
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

    <div className="flex border-l-1 flex-col max-w-md items-center  pl-5 md:mt-10 mt-14 ">
      <div className="flex justify-between text-xl max-w-sm">This Week</div>
      <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 max-w-md bg-white mt-5 " >
      <div
                
                className="flex flex-col items-center justify-between p-4 rounded-xl hover:bg-secondaryBlue cursor-pointer"
              >
                <div className="text-lg text-center mb-2 pr-6 pl-6">
                  {formatAMPM(new Date(currentData?.dt * 1000)) ? "Now" : ""}
                </div>
                <div className="text-center mb-2 ">
                  {fetchIcon(currentData ?currentData?.weather[0].icon: "")}
                </div>
                <div className="text-xl font-medium text-center pr-6 pl-6">
                  {Math.round(currentData ?currentData?.main.temp:0)}°C
                </div>
              </div>
        {hourlyData && (
          <>
            {hourlyData.list.map((hour: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between p-4 rounded-xl hover:bg-secondaryBlue cursor-pointer"
              >
                <div className="text-lg text-center mb-2 pr-6 pl-6">
                  {formatAMPM(new Date(hour.dt * 1000))}
                </div>
                <div className="text-center mb-2 ">
                  {fetchIcon(hour.weather[0].icon)}
                </div>
                <div className="text-xl font-medium text-center pr-6 pl-6">
                  {Math.round(hourlyData.list[index].main.temp)}°C
                </div>
              </div>

            ))}
          </>
        )}

      </div>

      <div className="text-neutral-800 flex flex-col  w-full mt-5">
        <div className="rounded-2xl">
          {climateData && (
            <div className="flex flex-col space-y-4 ">
              {climateData.list.map((day: any, index: number) => (
                <div key={index} className="flex justify-between border-0 font-medium m-1">
                  <div className="flex min-w-32 items-center p-4">{(currentDay == new Date(day.dt * 1000).getDay()) ? "Today" : dayNames[new Date(day.dt * 1000).getDay()]}</div>
                  <div className="flex justify-center items-center">
                    <div>{Math.round(day.temp.max)}° </div> <div className="text-gray-400">/{Math.round(day.temp.min)}°C</div>
                  </div>
                  <div>
                    {fetchIcon(day.weather[0].icon)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


    </div >

  )
}
