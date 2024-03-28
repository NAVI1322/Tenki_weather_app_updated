import { useEffect, useState } from "react";
import { currentWeather } from "../services/weatherData";



export function CurrentCard() {

  const [Ctemp, setCtemp] = useState<any>({});
  const [Cweather, setWeather] = useState<any>([{}])



  useEffect(() => {
    currentWeather("toronto").then((response) => {
      if (response) { setCtemp(response.main) }
    })
    currentWeather("toronto").then((response) => {
      if (response) { setWeather(response.weather) };
    })
  }, [])

  console.log(Ctemp)
  console.log(Cweather)



  return (<div className="flex flex-col">
    <div className="font-mono font-bold text-center text-2xl">
      {Ctemp.temp} %
    </div>
    <div className=" flex flex-row space-x-6 text-center ">
      {Cweather[0].main}
    </div>
    <div className=" flex flex-row space-x-6 text-center ">
      <div className="font-mono"> H:{Ctemp.temp_max} %</div>
      <div className="font-mono"> L:{Ctemp.temp_min} %</div>
    </div>
  </div>)
}
