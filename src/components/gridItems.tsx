import { ClimateData } from "../services/weatherData";
import { LoadingElement } from "./Loading";
import {  Loading } from "../atom/loading";
import { useRecoilValue } from "recoil";





export const GridItems = ({ climateData }: { climateData: ClimateData | null }) => {

  const loading = useRecoilValue(Loading);
  return (
    <div className="flex justify-center font-thin">

      <div className="grid grid-cols-2 col-span-2  gap-5 w-full ">
       
          <div className=" rounded-xl bg-blue-50 flex flex-col p-6 gap-4">
            <div className=" font-medium text-[18px]">{"Wind"}</div>
            <div className=" font-medium text-slate-400">{"Today wind speed"}</div>
            <div className="text-sm">{Math.round(climateData ? climateData?.list[0].speed * 3.6 : 0)} km/h</div>
          </div>
        
        <div className=" rounded-xl bg-blue-50  flex flex-col p-6 gap-4 ">
            <div className=" font-medium text-[18px]">{"Humidity"}</div>
            <div className=" font-medium text-slate-400">{"Today humidity"}</div>
            <div className="text-sm">{climateData?.list[0].humidity}%</div>
          </div>
        
        {<div className=" rounded-xl bg-blue-50  flex flex-col p-6 gap-4">
            <div className=" font-medium text-[18px]">{"Pressure"}</div>
            <div className=" font-medium text-slate-400">{"Today Pressure"}</div>
            <div className="text-sm">{(climateData?.list[0].pressure)}mBar</div>
          </div>
        }
        {loading
          ? <div className="  bg-blue-100  rounded-lg flex items-center justify-center"><LoadingElement /></div>
          :
          <div className=" rounded-xl bg-blue-50 flex flex-col p-6 ">
            <div className=" font-medium text-[18px] ">{"Today Temperatures"}</div>
            <div className=" pt-1 grid grid-cols-2 gap-2 space-x-2 text-sm">
              <div><p className=" text-slate-400">Morning</p>{climateData && Math.round(climateData?.list[0].temp.morn)}°C</div>
              <div><p className=" text-slate-400">Day</p>{climateData && Math.round(climateData?.list[0].temp.day)}°C</div>
              <div><p className=" text-slate-400">Eve</p>{climateData && Math.round(climateData?.list[0].temp.eve)}°C</div>
              <div><p className=" text-slate-400">Night</p>{climateData && Math.round(climateData?.list[0].temp.night)}°C</div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
