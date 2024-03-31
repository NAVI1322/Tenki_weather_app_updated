import { useEffect, useState } from "react";
import { WeatherData, currentWeather } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { FaLocationDot, FaWater, FaWind } from "react-icons/fa6";
import { BsDroplet } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

export function CurrentCard() {
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const inputBoxValue = useRecoilValue(textState)

  useEffect(() => {
    currentWeather(inputBoxValue).then((data) => {
      setCurrentData(data)
    })

  }, [inputBoxValue]);

  function hourAMPM(dt: number) {
    const date = new Date(dt * 1000);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const time12HourFormat = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

    return time12HourFormat;
  }

  return (
    <div className="flex flex-col m-8 text-primaryBlue bg-secondaryBlue rounded-xl p-4 shadow-lg md:w-[610px] w-[500px] justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="flex flex-row text-md justify-between  items-center gap-1 text-center ">
            <div className="flex  items-center gap-1">
              <FaLocationDot /> {currentData?.name}, {currentData?.sys.country}
            </div>
            <div className="flex ">
              Today {hourAMPM(currentData ? currentData?.dt : 0)}
            </div>
          </div>
          <div className="flex flex-col text-center p-3 items-between mt-10">
            <div className=" text-7xl mb-4">
              {(currentData ? Math.round(currentData.main.temp) + "°" : "") || <Skeleton />}
            </div>
            <div className="text-center capitalize mb-10">
              {currentData ? currentData.weather[0].description : ""}
            </div>

            <div className="flex mt-5 justify-between">
              <div className="flex flex-row text-center gap-1 items-center justify-center">
                <FaWater /> {currentData ? currentData.main.pressure + " hPa" : ""}
              </div>
              <div className="flex flex-row text-center gap-1 items-center justify-center">
                <BsDroplet /> {currentData ? currentData.main.humidity + " %" : ""}
              </div>
              <div className="flex flex-row text-center gap-1 items-center justify-center">
                <FaWind /> {currentData ? Math.round(currentData.wind.speed * 3.6) + " km/h" : ""}
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
