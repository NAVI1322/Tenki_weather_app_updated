import { useEffect, useState } from "react";
import { WeatherData, currentWeather, fetchIcon } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { FaLocationDot, FaWater, FaWind } from "react-icons/fa6";
import { BsDroplet } from "react-icons/bs";

export function CurrentCard() {
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const inputBoxValue = useRecoilValue(textState)

  useEffect(() => {
    currentWeather(inputBoxValue).then((data) => {
      if (data) {
        setCurrentData(data)
      }
    })
  }, [inputBoxValue]);

  console.log(currentData)

  return (
    <div className="flex flex-col m-8 text-primaryBlue bg-secondaryBlue rounded-lg p-4 shadow-lg w-96 ">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="flex flex-row text-lg items-center gap-1 text-center ">
            <FaLocationDot />{currentData?.name},{currentData?.sys.country}
          </div>
          <div className="flex flex-col text-center p-3 items-between mt-10">
            <div className=" text-7xl mb-4">
              {currentData ? Math.round(currentData.main.temp) + "°" : ""}
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
                <FaWind /> {currentData ? currentData.wind.speed + " km/h" : ""}
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
