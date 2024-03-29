import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE_URL = "https://pro.openweathermap.org/data/2.5/";

export interface WeatherData {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

export interface ClimateData {
  list: {
    dt: number;
    temp: {
      min: number;
      max: number;
      day: number;
      morn: number;
      eve: number;
      night: number;
    };
    weather: {
      description: string;
    }[];

    speed: number;
    deg: number;
    pressure: number;
    humidity: number;
  }[];
}

export interface HourlyData {
  list: {
    dt: number;
    main: {
      feels_like: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export const currentWeather = async (location: string) => {
  try {
    const res = await axios.get<WeatherData>(
      BASE_URL + "weather?q=" + location + "&units=metric" + "&APPID=" + API_KEY
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
};
export const HourlyWeather = async (location: string) => {
  try {
    const res = await axios.get<HourlyData>(
      BASE_URL +
        "forecast/hourly?q=" +
        location +
        "&cnt=24&units=metric&APPID=" +
        API_KEY
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching data", err);
  }
};
export const forecastWeather = async (location: string) => {
  try {
    const res = await axios.get<ClimateData>(
      BASE_URL +
        "forecast/climate?q=" +
        location +
        "&cnt=7&&units=metric&" +
        "&APPID=" +
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
