
import "./App.css";
import "./index.css"
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";
import { RecoilRoot } from "recoil";
function App() {
  return (
   <RecoilRoot>
      <div className="flex justify-between ">
        <DashBoard />
       <div className="flex flex-col  ">
        <CurrentCard />
        <GridItems />
       </div>
       <RightCard />
      </div>
      
   </RecoilRoot>
 
  );
}

export default App;
