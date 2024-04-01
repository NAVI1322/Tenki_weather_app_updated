
import { HourlyData, WeatherData, fetchIcon } from "../services/weatherData"
import { ClimateData } from "../services/weatherData";



export function RightCard(
  { hourlyData, climateData, currentData }: {
    hourlyData: HourlyData | null,
    climateData: ClimateData | null,
    currentData: WeatherData | null
  }
) {



  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = new Date().getDay();


  function formatAMPM(date: Date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = hours + ampm;
    return strTime;
  }

  return (
    <div className="flex border-l-1 flex-col  space-y-6 items-center  pl-5 md:mt-0 m-4 mt-14  md:border-l h-screen ">
      <div className="text-xl  text-center d:px-3 mt-8" >Today</div>
      
        <div className="no-scrollbar overflow-x-auto flex flex-row gap-4 md:max-w-md w-[100%] bg-white mt-5 h-full" >
          <div

            className="flex flex-col items-center justify-between p-4 space-y-2  rounded-xl hover:bg-secondaryBlue cursor-pointer"
          >
            <div className="text-lg text-center mb-2 pr-6 pl-6">
              {formatAMPM(new Date(currentData?.dt * 1000)) ? "Now" : ""}
            </div>
            <div className="text-center mb-2 ">
              {fetchIcon(currentData ? currentData?.weather[0].icon : "")}
            </div>
            <div className="text-xl font-medium text-center pr-6 pl-6">
              {Math.round(currentData ? currentData?.main.temp : 0)}°C
            </div>
          </div>

          {hourlyData && (
            <>
              {hourlyData.list.map((hour: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between p-4 rounded-xl hover:bg-secondaryBlue cursor-pointer"
                >
                  <div className="text-lg text-center mb-2 pr-6 pl-6">
                    {formatAMPM(new Date(hour.dt * 1000))}
                  </div>
                  <div className="text-center mb-2 ">
                    {fetchIcon(hour.weather[0].icon)}
                  </div>
                  <div className="text-xl font-medium text-center pr-6 pl-6">
                    {Math.round(hourlyData.list[index].main.temp)}°C
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      
      <div className="text-neutral-800 flex flex-col w-full">
      <div className="text-xl  text-center d:px-3 mt-8" >This Week</div>
          <div className="rounded-2xl  mt-5 
          "   >
            {climateData && (
              <div className="flex flex-col ">
                {climateData.list.map((day: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between  font-medium m-1"
                  >
                    <div className="flex items-center">
                      {currentDay == new Date(day.dt * 1000).getDay()
                        ? "Today"
                        : dayNames[new Date(day.dt * 1000).getDay()]}
                    </div>
                    <div className="flex justify-center items-center">
                      <div>{Math.round(day.temp.max)}° </div>{" "}
                      <div className="text-gray-400">
                        /{Math.round(day.temp.min)}°C
                      </div>
                    </div>
                    <div>{fetchIcon(day.weather[0].icon)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
                  
      </div>
    </div>
  );
}
