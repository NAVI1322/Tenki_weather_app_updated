const API_KEY = import.meta.env.VITE_WEATHER_API
const BASE_URL = "https://pro.openweathermap.org/data/2.5/"

export const currentWeather = async (location: string) => {
  try {
    const res = await fetch(BASE_URL + "weather?q=" + location + "&APPID=" + API_KEY)
    const weatherData = await res.json()
    console.log(weatherData)
    return weatherData
  } catch (err) {
    console.error("Error fetching data", err);
  }
}

export const forecastWeather = async (location: string) => {
  try {
    const res = await fetch(BASE_URL + "forecast/climate?q=" + location + "&APPID=" + API_KEY)
    const forecastData = await res.json()
    return forecastData
  } catch (err) {
    console.error("Error fetching data", err);
  }
}

