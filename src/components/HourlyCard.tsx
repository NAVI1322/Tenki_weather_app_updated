import { useEffect, useState } from "react"
import { HourlyData, HourlyWeather } from "../services/weatherData"

export function HourlyCard() {

  const [hourlyData, sethourlyData] = useState<HourlyData | null>(null)

  useEffect(() => {
    HourlyWeather("toronto").then(
      (data) => {
        console.log("in useeffect")
        if (data) {
          sethourlyData(data)
        }
      }
    )
  }, [])

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
    <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 max-w-md">

      {hourlyData && (
        <>
          {hourlyData.list.map((hour: any, index: number) => (
            <div
              key={index}
              className="flex justify-between h-36 from-blue-800 bg-gradient-to-r to-blue-950 rounded-md text-white font-medium"
            >
              <p className="flex justify-between pl-4">
                {formatAMPM(new Date(hour.dt * 1000))}
              </p>
              <p className="flex items-center pr-4">
                {Math.floor(hour.main.feels_like)}°C
              </p>
            </div>
          ))}
        </>
      )}

    </div>

  )
}
