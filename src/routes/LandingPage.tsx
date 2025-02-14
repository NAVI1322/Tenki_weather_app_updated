import { useState } from "react";
import { CurrentCard } from "../components/CurrentCard";
import { InputBox } from "../components/InputBox";
import { Loading } from "../components/Loading";
import { WeatherData, ClimateData } from "../services/weatherData";
import { RightCard } from "../components/RightCard";
import { ForecastCard } from "../components/ForecastCard";
import { WiDaySunny, WiCloud } from "react-icons/wi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function LandingPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ClimateData | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col gap-8 py-6">
        <div className="text-center space-y-6 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-10 opacity-20 animate-float">
            <WiCloud className="w-24 h-24 text-cartoon-blue" />
          </div>
          <div className="absolute top-10 right-10 opacity-20 animate-float-slow">
            <WiCloud className="w-16 h-16 text-cartoon-purple" />
          </div>
          
          {/* Title section */}
          <div className="relative">
            <div className="flex items-center justify-center gap-6">
              <WiDaySunny className="w-20 h-20 text-cartoon-yellow animate-spin-slow drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
              <h1 className="text-7xl font-display bg-gradient-to-r from-cartoon-orange via-cartoon-pink to-cartoon-purple text-transparent bg-clip-text drop-shadow-sm">
                Tenki
              </h1>
            </div>
            <p className="text-2xl text-primary-600/70 font-display mt-4">
              Your Daily Weather Companion ✨
            </p>
          </div>

          {/* Search box */}
          <div className="max-w-2xl mx-auto w-full px-4">
            <InputBox 
              setWeatherData={setWeatherData} 
              setLoading={setLoading}
              setForecastData={setForecastData}
            />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
            <div className="lg:col-span-7 space-y-8">
              <CurrentCard currentData={weatherData} />
              <RightCard weatherData={weatherData} />
            </div>
            <div className="lg:col-span-5">
              <ForecastCard forecastData={forecastData} />
            </div>
          </div>
        ) : (
          <div className="text-center text-primary-400 font-display text-xl">
            Enter a city name to see the weather magic! ✨
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="text-xl font-display text-primary-600">
            Developed by Navneet Sharma
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/navi1322"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors duration-300 flex items-center gap-2 group"
            >
              <FaGithub className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-display">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/navneet7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors duration-300 flex items-center gap-2 group"
            >
              <FaLinkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-display">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
