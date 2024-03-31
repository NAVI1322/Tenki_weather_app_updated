import "./App.css";
import "./index.css";
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";
import { RecoilRoot } from "recoil";
import { Appbar } from "./components/AppBar";


function App() {


  return (
    <RecoilRoot>
  

   <div className=" md:flex flex-row  ">
        <DashBoard />

       <div className="flex flex-col justify-center  ">
          <Appbar />
          <CurrentCard />
          <GridItems />
        </div>
        <div className="flex justify-center md:block">
          <RightCard />
        </div>
      
      </div>  

    
    </RecoilRoot>

    // <div>
    //   <Contact />
    // </div>
  );
}

export default App;
