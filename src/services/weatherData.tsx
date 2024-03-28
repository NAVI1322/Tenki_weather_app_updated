import axios from "axios"

const API_KEY = import.meta.env.VITE_WEATHER_API
const BASE_URL = "https://pro.openweathermap.org/data/2.5/"

interface WeatherData {
  list: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}


export const currentWeather = async (location: string) => {
  try {
    const res = await axios.get<WeatherData>(BASE_URL + "weather?q=" + location + "&units=metric" + "&APPID=" + API_KEY)
    return res.data
  } catch (err) {
    console.error("Error fetching data", err);
  }
}

export const forecastWeather = async (location: string) => {
  try {
    const res = await axios.get<WeatherData>(BASE_URL + "forecast/climate?q=" + location + "&APPID=" + API_KEY)
    return res.data
  } catch (err) {
    console.error("Error fetching data", err);
  }
}

