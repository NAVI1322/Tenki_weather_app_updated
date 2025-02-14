import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiHumidity, WiStrongWind } from "react-icons/wi";
import { ClimateData } from "../services/weatherData";
import { useState } from "react";

interface ForecastCardProps {
  forecastData: ClimateData | null;
}

export function ForecastCard({ forecastData }: ForecastCardProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');
  
  if (!forecastData) return null;

  function getWeatherIcon(weatherId: number, size: "sm" | "lg" = "lg") {
    const className = size === "lg" ? "w-12 h-12" : "w-6 h-6";
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm className={`${className} text-cartoon-yellow`} />;
    if (weatherId >= 300 && weatherId < 600) return <WiRain className={`${className} text-cartoon-blue`} />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow className={`${className} text-cartoon-blue`} />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog className={`${className} text-gray-400`} />;
    if (weatherId === 800) return <WiDaySunny className={`${className} text-cartoon-yellow`} />;
    return <WiCloudy className={`${className} text-gray-400`} />;
  }

  function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  }

  function formatTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  }

  // Group forecast data by day
  const dailyForecasts = forecastData.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc.find(day => new Date(day.dt * 1000).toDateString() === date)) {
      acc.push(item);
    }
    return acc;
  }, []).slice(0, 5); // Get next 5 days

  // Get next 24 hours of forecast
  const hourlyForecasts = forecastData.list.slice(0, 8); // 3-hour intervals for 24 hours

  return (
    <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-[2rem] p-8 shadow-cartoon-lg border-4 border-white backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-display bg-gradient-to-r from-cartoon-blue to-cartoon-purple text-transparent bg-clip-text">
          Weather Forecast
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg font-display text-sm transition-all duration-300 ${
              activeTab === 'daily'
                ? 'bg-cartoon-blue text-white shadow-cartoon'
                : 'text-primary-400 hover:text-primary-600'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-4 py-2 rounded-lg font-display text-sm transition-all duration-300 ${
              activeTab === 'hourly'
                ? 'bg-cartoon-purple text-white shadow-cartoon'
                : 'text-primary-400 hover:text-primary-600'
            }`}
          >
            Hourly
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {activeTab === 'daily' ? (
          // Daily forecast
          dailyForecasts.map((day, index) => (
            <div key={index} className="group">
              <div className="flex flex-col p-4 bg-gradient-to-br from-white/50 to-white rounded-xl hover:shadow-cartoon transition-all duration-300 border-2 border-primary-100/20 transform hover:-translate-y-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {getWeatherIcon(day.weather[0].id)}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-lg"></div>
                    </div>
                    <div>
                      <div className="font-display text-primary-600">{formatDate(day.dt)}</div>
                      <div className="text-sm text-primary-500/70 capitalize">{day.weather[0].description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-display text-cartoon-pink text-xl">{Math.round(day.main.temp_max)}°</div>
                      <div className="text-sm text-primary-400">High</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-cartoon-blue text-xl">{Math.round(day.main.temp_min)}°</div>
                      <div className="text-sm text-primary-400">Low</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-primary-100/20">
                  <div className="flex flex-col items-center text-cartoon-teal">
                    <WiHumidity className="w-6 h-6" />
                    <span className="text-xs font-medium">{day.main.humidity}%</span>
                    <span className="text-xs text-primary-400">Humidity</span>
                  </div>
                  <div className="flex flex-col items-center text-cartoon-indigo">
                    <WiStrongWind className="w-6 h-6" />
                    <span className="text-xs font-medium">{Math.round(day.wind.speed * 3.6)} km/h</span>
                    <span className="text-xs text-primary-400">Wind</span>
                  </div>
                  <div className="flex flex-col items-center text-cartoon-orange">
                    <WiDaySunny className="w-6 h-6" />
                    <span className="text-xs font-medium">{Math.round(day.main.feels_like)}°</span>
                    <span className="text-xs text-primary-400">Feels</span>
                  </div>
                  <div className="flex flex-col items-center text-cartoon-purple">
                    <div className="text-xs font-medium">{Math.round(day.pop * 100)}%</div>
                    <span className="text-xs text-primary-400">Rain</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Hourly forecast
          <div className="grid grid-cols-4 gap-4">
            {hourlyForecasts.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-white/50 to-white rounded-xl hover:shadow-cartoon transition-all duration-300 border-2 border-primary-100/20 transform hover:-translate-y-1"
              >
                <div className="text-sm font-display text-primary-600 mb-2">
                  {formatTime(hour.dt)}
                </div>
                <div className="relative mb-2">
                  {getWeatherIcon(hour.weather[0].id, "sm")}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/10 rounded-full blur-lg"></div>
                </div>
                <div className="font-display text-lg text-primary-600">
                  {Math.round(hour.main.temp)}°
                </div>
                <div className="text-xs text-primary-400 mt-2">
                  {Math.round(hour.pop * 100)}% rain
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 