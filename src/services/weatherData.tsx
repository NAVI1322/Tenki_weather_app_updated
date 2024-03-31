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
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,

  }
  wind: {
    speed: number,
  }
  clouds: {
    all: number;
  };
  sys: {
    country: string;
  };
  dt: number | any;
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
const getNavigations = () => {

  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;


          resolve({ latitude, longitude });
        },
        function(error) {
          console.error("Error getting location:", error.message);
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
};



async function getLocation() {
  const { longitude, latitude }: any = await getNavigations();
  try {

    const response = await axios.get(
      `${BASE_URL}forecast/climate?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    return response.data.city.name;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


export const currentWeather = async (location: string) => {
  try {
    const { latitude, longitude } = await getCoords()
    console.log(latitude, longitude, "current")
    const GetCityName = await getLocation()
    const CityName = location ? location : GetCityName;

    const res = await axios.get<WeatherData>(
      BASE_URL + "weather?q=" + CityName + "&units=metric" + "&APPID=" + API_KEY
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
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
export const forecastWeather = async (location: string) => {
  try {

    const GetCityName = await getLocation()
    const CityName = location ? location : GetCityName;

    const res = await axios.get<ClimateData>(
      BASE_URL +
      "forecast/climate?q=" +
      CityName +
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
