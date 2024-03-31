import { useEffect, useState } from "react";
import { ClimateData, forecastWeather } from "../services/weatherData";
import { useRecoilValue } from "recoil";
import { textState } from "../atom/inputfields";
import { Loading } from "./Loading";

export const GridItems = () => {
  const [weather, setWeather] = useState<ClimateData | null>(null);
  const inputBoxValue = useRecoilValue(textState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    forecastWeather(inputBoxValue).then((data) => {
      if (data) {
        setLoading(true)
        setWeather(data);
        setLoading(false)
      }
    });
  }, [inputBoxValue]);

  return (
    <div className="flex items-center justify-center">
      
      <div className="grid grid-cols-2 col-span-2 md:w-[610px] gap-5 ">
        {loading
         ? <div className="mb-6 mt-3 bg-blue-100 md:w-[300px] md:h-[160px] rounded-lg flex items-center justify-center w-[250px] h-[120px] "><Loading /></div> 
        :
        <div className=" rounded-xl bg-blue-50 flex flex-col p-6 gap-4">
          <div className=" font-medium text-[18px]">{"Wind"}</div>
          <div className=" font-medium text-slate-400">{"Today wind speed"}</div>
          <div>{Math.round(weather ? weather?.list[0].speed * 3.6 : 0)} km/h</div>
        </div>
        } 
        {loading
        ?<div className="mb-6 mt-3 bg-blue-100 md:w-[300px] md:h-[160px] w-[250px] h-[120px] rounded-lg flex items-center justify-center"><Loading /></div>
        :<div className=" rounded-xl bg-blue-50  flex flex-col p-6 gap-4 ">
          <div className=" font-medium text-[18px]">{"Humidity"}</div>
          <div className=" font-medium text-slate-400">{"Today humidity"}</div>
          <div>{weather?.list[0].humidity}%</div>
        </div>
        }
         {loading
        ?<div className="  bg-blue-100 md:w-[300px] md:h-[160px] rounded-lg flex items-center justify-center w-[250px] h-[120px]"><Loading /></div>
        :<div className=" rounded-xl bg-blue-50  flex flex-col p-6 gap-4">
          <div className=" font-medium text-[18px]">{"Pressure"}</div>
          <div className=" font-medium text-slate-400">{"Today Pressure"}</div>
          <div>{(weather?.list[0].pressure)}mBar</div>
        </div>
        }
         {loading
        ?<div className="  bg-blue-100 md:w-[300px] md:h-[160px] rounded-lg flex items-center justify-center w-[250px] h-[120px]"><Loading /></div>
        :
        <div className=" rounded-xl bg-blue-50 flex flex-col p-6 ">
          <div className=" font-medium text-[18px] ">{"Today Temperatures"}</div>
          <div className=" pt-1 grid grid-cols-2 gap-2">
            <div><p className=" text-slate-400">Morning</p>{weather && Math.round(weather?.list[0].temp.morn)}°C</div>
            <div><p className=" text-slate-400">Day</p>{weather && Math.round(weather?.list[0].temp.day)}°C</div>
            <div><p className=" text-slate-400">Eve</p>{weather && Math.round(weather?.list[0].temp.eve)}°C</div>
            <div><p className=" text-slate-400">Night</p>{weather && Math.round(weather?.list[0].temp.night)}°C</div>
          </div>
        </div>
        }
      </div>
    </div>
  );
};
