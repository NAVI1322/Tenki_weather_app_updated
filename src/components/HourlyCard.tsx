import { useEffect, useState } from "react"
import { HourlyData, HourlyWeather } from "../services/weatherData"
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";

export function HourlyCard() {

  const [hourlyData, sethourlyData] = useState<HourlyData | null>(null)
  const inputBoxValue = useRecoilValue(textState)

  useEffect(() => {
   async function Hourly(){
      await HourlyWeather(inputBoxValue).then(
        (data) => {
          if (data) {
            sethourlyData(data)
          }
        }
      )
    }
    Hourly()
   
  }, [inputBoxValue])

  function formatAMPM(date: Date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = hours + " " + ampm;
    return strTime;
  }

  console.log(hourlyData)
  return (
    <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 max-w-md  bg-white  m-10">

      {hourlyData && (
        <>
          {hourlyData.list.map((hour: any, index: number) => (
            <div
              key={index}
              className="flex justify-between h-36 from-gray-400 bg-gradient-to-r to-blue-200 rounded-md  shadow-inner text-white font-medium"
            >
              <p className="p-5 ">
                {formatAMPM(new Date(hour.dt * 1000))}
              </p>
              <p className="flex items-center p-5">
                {Math.floor(hour.main.feels_like)}°C
              </p>
            </div>
          ))}
        </>
      )}

    </div>

  )
}
