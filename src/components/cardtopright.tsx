import { useEffect, useState } from "react";
import { currentWeather } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { fetchIcon } from "./DailyCard";
export function CurrentCard() {
  const [Ctemp, setCtemp] = useState<any>({});
  const [Cweather, setWeather] = useState<any>([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState<any>("Toronto"); 
  const [countryName, setCountry] = useState<any>("CA");
  const inputBoxValue = useRecoilValue(textState);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tempResponse, weatherResponse, cityResponse, countryResponse] = await Promise.all<any>([
          currentWeather(inputBoxValue),
          currentWeather(inputBoxValue),
          currentWeather(inputBoxValue),
          currentWeather(inputBoxValue),
        ]);
          
        setCtemp(tempResponse.main);
        setWeather(weatherResponse.weather);

        setCity(cityResponse.name);
        setCountry(countryResponse.sys);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputBoxValue]); 
 

  console.log(Ctemp);
  console.log(Cweather);
  console.log(city);
  console.log(countryName);

  return (
    <div className="flex  ">
      <div className="flex flex-col m-8 bg-slate-200 border-4 border-gray-200  p-8 shadow-lg w-96 ">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="font-mono font-bold text-4xl :">
              {city},{countryName.country}
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
