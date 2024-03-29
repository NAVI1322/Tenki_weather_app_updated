import { useEffect, useState } from "react";

import { currentWeather } from "../services//weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";

export function CurrentCard() {
  const [Ctemp, setCtemp] = useState<any>({});
  const [Cweather, setWeather] = useState<any>([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [country,Setcountry] = useState("Ca")
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
    const fetchData = async () => {
      try {
        const [tempResponse, weatherResponse] = await Promise.all<any>([
          currentWeather(inputBoxValue),
          currentWeather(inputBoxValue),
        ]);
          
        if (tempResponse.cod === 404 && weatherResponse.cod === 404) {
          setError('City not found');
        } else {
          setCtemp(tempResponse.main);
          setWeather(weatherResponse.weather);
          Setcountry(tempResponse.sys.country);
        }
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputBoxValue]);


  

  return (
    <div className="flex  ">
      <div className="flex flex-col m-8 bg-slate-200 border-4 border-gray-200  p-8 shadow-lg w-96 max-wd-md ">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="">Error: {error}</div>
        ) : (
          <>
            <div className="font-mono font-bold text-4xl  text-center ">
              {inputBoxValue?inputBoxValue:"Toronto"},{country}
            </div>
            <div className="font-mono font-bold text-3xl text-center p-3">
              {Math.round(Ctemp.temp)}°C
            </div>
            <div className="font-mono font-bold text-center">
              {Cweather[0].description}
            </div>
            <div className="flex justify-center">
              <div className="space-x-6 items-center">
                {fetchIcon(Cweather[0].icon)}
              </div>
            </div>
            <div className="flex flex-row space-x-6 justify-center ">
              <div className="font-mono">H:{Math.round(Ctemp.temp_max)}°C</div>
              <div className="font-mono">L:{Math.round(Ctemp.temp_min)}°C</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
