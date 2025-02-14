import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

interface WeatherErrorResponse {
  message: string;
}

export interface WeatherData extends Partial<WeatherErrorResponse> {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
    id: number;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ClimateData extends Partial<WeatherErrorResponse> {
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
      id: number;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
    pop: number; // probability of precipitation
  }[];
}

export interface HourlyData {
  list: {
    dt: number;
    main: {
      temp: number
      feels_like: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

const getCoords = () => {
  return new Promise<{ latitude: number; longitude: number }>((res, req) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, "coords")
        res({ latitude, longitude })
      },
        (err) => {
          console.log("Error getting user location")
          req(err)
        });
    }
  })
}

async function getLocation() {
  const { longitude, latitude }: any = await getCoords();
  try {

    const response = await axios.get(
      `${BASE_URL}forecast/climate?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    return response.data.city.name;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchForecastData = async (city: string): Promise<ClimateData> => {
  try {
    const response = await axios.get<ClimateData>(
      `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const HourlyWeather = async (location: string) => {
  try {

    const GetCityName = await getLocation()

    const CityName = location ? location : GetCityName;

    const res = await axios.get<HourlyData>(
      BASE_URL +
      "forecast/hourly?q=" +
      CityName +
      "&cnt=24&units=metric&APPID=" +
      API_KEY
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching data", err);
  }
};

export const fetchIcon = (code: string) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt="Icon"
      className=" h-[60px] w-[60px] "
    />
  );
};
