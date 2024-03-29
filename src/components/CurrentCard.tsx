import { useEffect, useState } from "react";
import { WeatherData, currentWeather } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";

export function CurrentCard() {
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const inputBoxValue = useRecoilValue(textState)

  const fetchIcon = (code: string) => {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${code}@2x.png`}
        alt="Icon"
        className=" h-[60px] w-[60px] "
      />
    );
  };

  useEffect(() => {
    currentWeather(inputBoxValue).then((data) => {
      if (data) {
        setCurrentData(data)
      }
    })
  }, [inputBoxValue]);

  return (
    <div className="flex  ">
      <div className="flex flex-col m-8 bg-slate-200 border-4 border-gray-200  p-8 shadow-lg w-96 ">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="font-mono font-bold text-4xl  text-center ">
              {inputBoxValue ? inputBoxValue : "Toronto"}
            </div>
            <div className="font-mono font-bold text-3xl text-center p-3">
              {currentData ? Math.round(currentData.main.temp) + "°C" : ""}
            </div>
            <div className="font-mono font-bold text-center">
              {currentData ? currentData.weather[0].description : ""}
            </div>
            <div className="flex justify-center">
              <div className="space-x-6 items-center">
                {fetchIcon(currentData ? currentData.weather[0].icon : "")}
              </div>
            </div>
            <div className="flex flex-row space-x-6 justify-center ">
              <div className="font-mono">H:{currentData ? Math.round(currentData.main.temp_max) + "°C" : ""}</div>
              <div className="font-mono">L:{currentData ? Math.round(currentData.main.temp_min) + "°C" : ""}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
