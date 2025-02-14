import { useState } from "react";
import { WeatherData, ClimateData } from "../services/weatherData";
import { FaLocationCrosshairs } from "react-icons/fa6";

interface InputBoxProps {
  setWeatherData: (data: WeatherData | null) => void;
  setForecastData: (data: ClimateData | null) => void;
  setLoading: (loading: boolean) => void;
}

export function InputBox({ setWeatherData, setForecastData, setLoading }: InputBoxProps) {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCoords = async (latitude: number, longitude: number) => {
    try {
      // Fetch current weather by coordinates
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      
      if (weatherResponse.ok) {
        setWeatherData(weatherData);
        setCity(weatherData.name); // Update the input field with the city name
        
        // Fetch forecast by coordinates
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        if (forecastResponse.ok) {
          setForecastData(forecastData);
        } else {
          console.error("Error fetching forecast:", forecastData.message);
          setForecastData(null);
        }
      } else {
        throw new Error(weatherData.message || 'Failed to fetch weather data');
      }
    } catch (error) {
      console.error("Error fetching weather by location:", error);
      setError("Failed to fetch weather data for your location. Please try again.");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        } catch (error) {
          console.error("Error in location weather fetch:", error);
          setError("Failed to fetch weather data for your location");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Unable to get your location. Please make sure location access is enabled.");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      
      if (weatherResponse.ok) {
        setWeatherData(weatherData);
        
        // If current weather is successful, fetch forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        if (forecastResponse.ok) {
          setForecastData(forecastData);
        } else {
          console.error("Error fetching forecast:", forecastData.message);
          setForecastData(null);
        }
      } else {
        const errorMessage = weatherData.message || 'Failed to fetch weather data';
        console.error("Error details:", {
          status: weatherResponse.status,
          statusText: weatherResponse.statusText,
          message: weatherData.message
        });
        setError(errorMessage);
        setWeatherData(null);
        setForecastData(null);
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      setError("Failed to connect to weather service. Please check your internet connection.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder:text-blue-400 font-display"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-cartoon-blue to-cartoon-purple text-white rounded-lg hover:from-cartoon-purple hover:to-cartoon-blue transition-all duration-300 transform hover:scale-105 font-display"
          >
            Search
          </button>
        </div>
        <button
          onClick={handleLocationClick}
          className="px-4 py-3 bg-gradient-to-r from-cartoon-green to-cartoon-teal text-white rounded-xl hover:from-cartoon-teal hover:to-cartoon-green transition-all duration-300 transform hover:scale-105 font-display flex items-center gap-2 group"
        >
          <FaLocationCrosshairs className="w-5 h-5 group-hover:animate-spin" />
          <span className="hidden sm:inline">Use My Location</span>
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-sm bg-red-50/80 p-4 rounded-xl border-2 border-red-100 animate-fade-in font-display backdrop-blur-sm">
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </div>
      )}
    </div>
  );
}
