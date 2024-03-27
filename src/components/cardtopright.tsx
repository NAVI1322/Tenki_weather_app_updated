import { useEffect, useState } from "react";
import { currentWeather } from "../services/weatherData";



export  function CurrentCard()
{

    const [Ctemp,setCtemp] = useState({});

    useEffect(()=>{
     currentWeather("toronto").then((response)=>{
      setCtemp(response.main)
        })
    },[])
    
    console.log(Ctemp);

    
  

    
    return( <div className="flex flex-col">
            <div className="font-mono font-bold text-center text-2xl">
        
            </div>
            <div>


            </div>
    </div>)
}