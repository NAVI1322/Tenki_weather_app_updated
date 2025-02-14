import { WeatherData } from "../services/weatherData";
import { FaLocationDot, FaWater, FaWind } from "react-icons/fa6";
import { BsDroplet } from "react-icons/bs";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import Skeleton from "react-loading-skeleton";

export function CurrentCard({ currentData }: { currentData: WeatherData | null }) {
  function getWeatherIcon(weatherId: number) {
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm className="w-40 h-40 text-cartoon-yellow animate-pulse drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]" />;
    if (weatherId >= 300 && weatherId < 600) return <WiRain className="w-40 h-40 text-cartoon-blue animate-bounce drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]" />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow className="w-40 h-40 text-cartoon-blue animate-spin-slow drop-shadow-[0_0_20px_rgba(191,219,254,0.4)]" />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog className="w-40 h-40 text-gray-400 animate-pulse drop-shadow-[0_0_20px_rgba(156,163,175,0.4)]" />;
    if (weatherId === 800) return <WiDaySunny className="w-40 h-40 text-cartoon-yellow animate-spin-slow drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]" />;
    return <WiCloudy className="w-40 h-40 text-gray-400 animate-float drop-shadow-[0_0_20px_rgba(156,163,175,0.4)]" />;
  }

  function hourAMPM(dt: number) {
    const date = new Date(dt * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-[2rem] p-8 shadow-cartoon-lg hover:shadow-2xl transition-all duration-300 justify-center w-full backdrop-blur-sm border-4 border-white">
      {currentData ? (
        <>
          <div className="flex flex-row text-md justify-between items-center">
            <div className="flex items-center gap-3 font-medium text-primary-600 hover:scale-105 transition-transform duration-300 bg-white/70 px-6 py-3 rounded-full shadow-cartoon">
              <FaLocationDot className="animate-bounce text-cartoon-pink" />
              <span className="font-display">{currentData.name}, {currentData.sys.country}</span>
            </div>
            <div className="font-display text-primary-500 bg-white/70 px-6 py-3 rounded-full shadow-cartoon">
              {hourAMPM(currentData.dt)}
            </div>
          </div>

          <div className="flex flex-col items-center p-8 mt-4 relative">
            <div className="transform hover:scale-110 transition-transform duration-300 relative animate-bounce-slight">
              {getWeatherIcon(currentData.weather[0].id)}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/10 rounded-full blur-xl"></div>
            </div>
            <div className="text-8xl font-display bg-gradient-to-r from-cartoon-blue to-cartoon-purple text-transparent bg-clip-text mt-8 hover:scale-105 transition-transform duration-300 relative animate-wiggle">
              {Math.round(currentData.main.temp)}°
            </div>
            <div className="text-2xl text-primary-600 capitalize mt-4 font-display bg-white/70 px-8 py-3 rounded-full shadow-cartoon">
              {currentData.weather[0].description}
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 w-full">
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-cartoon-blue/10 to-white hover:from-cartoon-blue/20 hover:to-white transition-colors duration-300 shadow-cartoon hover:shadow-cartoon-lg transform hover:-translate-y-1">
                <FaWater className="text-cartoon-blue text-3xl mb-2 animate-spin-slow" />
                <span className="text-sm font-display text-primary-600">{currentData.main.pressure} hPa</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-cartoon-purple/10 to-white hover:from-cartoon-purple/20 hover:to-white transition-colors duration-300 shadow-cartoon hover:shadow-cartoon-lg transform hover:-translate-y-1">
                <BsDroplet className="text-cartoon-purple text-3xl mb-2 animate-bounce" />
                <span className="text-sm font-display text-primary-600">{currentData.main.humidity}%</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-cartoon-pink/10 to-white hover:from-cartoon-pink/20 hover:to-white transition-colors duration-300 shadow-cartoon hover:shadow-cartoon-lg transform hover:-translate-y-1">
                <FaWind className="text-cartoon-pink text-3xl mb-2 animate-pulse" />
                <span className="text-sm font-display text-primary-600">{Math.round(currentData.wind.speed * 3.6)} km/h</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Skeleton count={5} className="my-2" />
      )}
    </div>
  );
}
