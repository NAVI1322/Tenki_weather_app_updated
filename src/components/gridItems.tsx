import { ClimateData } from "../services/weatherData";
import { Loading } from "./Loading";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";

interface GridItemsProps {
  forecastData: ClimateData | null;
}

export function GridItems({ forecastData }: GridItemsProps) {
  if (!forecastData) return <Loading />;

  const currentWeather = forecastData.list[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Wind Speed */}
      <div className="bg-gradient-to-br from-white/50 to-white rounded-xl p-6 shadow-cartoon hover:shadow-cartoon-lg transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="relative">
            <WiStrongWind className="w-12 h-12 text-cartoon-blue group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-primary-500/70">Wind Speed</div>
            <div className="text-2xl font-display text-primary-600">
              {Math.round(currentWeather.wind.speed * 3.6)} km/h
            </div>
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div className="bg-gradient-to-br from-white/50 to-white rounded-xl p-6 shadow-cartoon hover:shadow-cartoon-lg transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="relative">
            <WiHumidity className="w-12 h-12 text-cartoon-teal group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-primary-500/70">Humidity</div>
            <div className="text-2xl font-display text-primary-600">
              {currentWeather.main.humidity}%
            </div>
          </div>
        </div>
      </div>

      {/* Pressure */}
      <div className="bg-gradient-to-br from-white/50 to-white rounded-xl p-6 shadow-cartoon hover:shadow-cartoon-lg transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="relative">
            <WiBarometer className="w-12 h-12 text-cartoon-purple group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-lg"></div>
          </div>
          <div>
            <div className="text-sm text-primary-500/70">Pressure</div>
            <div className="text-2xl font-display text-primary-600">
              {currentWeather.main.pressure} hPa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
