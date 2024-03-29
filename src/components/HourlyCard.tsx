import { useEffect, useState } from "react"
import { HourlyData, HourlyWeather, fetchIcon } from "../services/weatherData"
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";

export function HourlyCard() {

  const [hourlyData, sethourlyData] = useState<HourlyData | null>(null)
  const inputBoxValue = useRecoilValue(textState)

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
    <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 max-w-md  bg-white  m-10 font-mono" >

      {hourlyData && (
        <>
          {hourlyData.list.map((hour: any, index: number) => (
            <div
              key={index}
              className="flex flex-col  justify-between h-36 from-gray-400 bg-gradient-to-r to-blue-200 rounded-md  shadow-inner text-white font-medium"
            >
              <div className="flex flex-row">
                <div className="p-5 ">
                  {formatAMPM(new Date(hour.dt * 1000))}
                </div>
                <div className=" p-5">
                  {Math.round(hour.main.temp)}°C
                </div>
              </div>
              <div className="flex flex-col items-center p-3">
                {fetchIcon(hour.weather[0].icon)}
              </div>
            </div>
          ))}
        </>
      )}

    </div>

  )
}
