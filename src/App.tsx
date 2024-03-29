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
      <div className="flex justify-between ">
        <DashBoard />
       <div className="md:flex flex-col md:flex-row ">
       <div className="flex flex-col  ">
          <Appbar />
          <CurrentCard />
          <GridItems />
        </div>
        <div className=" ">
          <RightCard />
        </div>
       </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
