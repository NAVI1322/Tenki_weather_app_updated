import { Appbar } from "./components/AppBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./routes/Contact";
import Team from "./routes/Team";
import { RecoilRoot } from "recoil";
import Home from "./Home";
import "./index.css"
import { RightCard } from "./components/RightCard";
import { DashBoard } from "./components/Dashboard";
import { GridItems } from "./components/gridItems";
import { CurrentCard } from "./components/CurrentCard";
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
