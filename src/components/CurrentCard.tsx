
import { WeatherData } from "../services/weatherData";
import { FaLocationDot, FaWater, FaWind } from "react-icons/fa6";
import { BsDroplet } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";


export function CurrentCard({ currentData }: { currentData: WeatherData | null }) {



  function hourAMPM(dt: number) {
    const date = new Date(dt * 1000);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const time12HourFormat =
      hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;

    return time12HourFormat;
  }

  return (
    <div className="flex flex-col  text-primaryBlue  bg-secondaryBlue rounded-xl p-4 shadow-lg justify-center  md:0">
        
          <div className="flex flex-row text-md justify-between ">
            <div className="flex items-center ">
              <FaLocationDot />  {currentData?.name}, {currentData?.sys.country}
            </div>
            <div className="flex">Today {hourAMPM(currentData ? currentData?.dt : 0)}</div>
          </div>
          <div className="flex flex-col text-center p-3 items-between mt-10 ">
            <div className=" text-7xl mb-4">
              {(currentData ? Math.round(currentData.main.temp) + "°" : "") || <Skeleton />}
            </div>
            <div className="text-center capitalize mb-10">
              {currentData ? currentData.weather[0].description : ""}
            </div>

            <div className="flex mt-5 justify-between space-x-10">
              <div className="flex flex-row text-center gap-1 items-center justify-center">
                <FaWater /> {currentData ? currentData.main.pressure + " hPa" : ""}
              </div>
              <div className="flex flex-row text-center gap-1 items-center justify-center">
                <BsDroplet /> {currentData ? currentData.main.humidity + " %" : ""}
              </div>
              <div className="flex flex-row text-center gap-1 items-center justify-center ">
                <FaWind /> {currentData ? Math.round(currentData.wind.speed * 3.6) + " km/h" : ""}
              </div>
            </div>
          </div>
        
      
    </div>
  );
}
