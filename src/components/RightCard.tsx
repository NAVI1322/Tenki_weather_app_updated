import { WeatherData } from "../services/weatherData";
import { WiSunrise, WiSunset, WiThermometer, WiStrongWind } from "react-icons/wi";

interface RightCardProps {
  weatherData: WeatherData | null;
}

export function RightCard({ weatherData }: RightCardProps) {
  if (!weatherData) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-[2rem] p-8 shadow-cartoon-lg space-y-8 border-4 border-white backdrop-blur-sm">
      <h2 className="text-3xl font-display bg-gradient-to-r from-cartoon-blue to-cartoon-purple text-transparent bg-clip-text">Weather Details</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-cartoon-yellow/10 to-white rounded-2xl hover:shadow-cartoon-lg transition-all duration-300 border-2 border-cartoon-yellow/20 transform hover:-translate-y-1 shadow-cartoon">
          <div className="relative">
            <WiSunrise className="w-14 h-14 text-cartoon-yellow group-hover:animate-spin-slow transition-all duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-cartoon-yellow/20 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-cartoon-yellow/70 font-medium">Sunrise</div>
            <div className="font-display text-lg text-cartoon-yellow">{formatTime(weatherData.sys.sunrise)}</div>
          </div>
        </div>

        <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-cartoon-orange/10 to-white rounded-2xl hover:shadow-cartoon-lg transition-all duration-300 border-2 border-cartoon-orange/20 transform hover:-translate-y-1 shadow-cartoon">
          <div className="relative">
            <WiSunset className="w-14 h-14 text-cartoon-orange group-hover:animate-spin-slow transition-all duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-cartoon-orange/20 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-cartoon-orange/70 font-medium">Sunset</div>
            <div className="font-display text-lg text-cartoon-orange">{formatTime(weatherData.sys.sunset)}</div>
          </div>
        </div>

        <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-cartoon-pink/10 to-white rounded-2xl hover:shadow-cartoon-lg transition-all duration-300 border-2 border-cartoon-pink/20 transform hover:-translate-y-1 shadow-cartoon">
          <div className="relative">
            <WiThermometer className="w-14 h-14 text-cartoon-pink group-hover:animate-bounce transition-all duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-cartoon-pink/20 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-cartoon-pink/70 font-medium">Feels Like</div>
            <div className="font-display text-lg text-cartoon-pink">{Math.round(weatherData.main.feels_like)}°C</div>
          </div>
        </div>

        <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-cartoon-green/10 to-white rounded-2xl hover:shadow-cartoon-lg transition-all duration-300 border-2 border-cartoon-green/20 transform hover:-translate-y-1 shadow-cartoon">
          <div className="relative">
            <WiStrongWind className="w-14 h-14 text-cartoon-green group-hover:animate-float transition-all duration-300" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-cartoon-green/20 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-cartoon-green/70 font-medium">Wind Direction</div>
            <div className="font-display text-lg text-cartoon-green">{weatherData.wind.deg}°</div>
          </div>
        </div>
      </div>
    </div>
  );
}
