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
function App() {
  return (
    // <RecoilRoot>
    //   <div>
    //     <Router>
    //       <div>
    //         <Appbar />
    //       </div>
    //       <Routes>
    //         <Route path="/contact" element={<Contact />} />
    //         <Route path="/team" element={<Team />} />
    //         <Route path="/" element={<Home />} />
    //       </Routes>
    //     </Router>
    //   </div>
   // </RecoilRoot>
   <RecoilRoot>
   <div>
      <RightCard />
      <DashBoard />
    </div>
   </RecoilRoot>
 
  );
}

export default App;
