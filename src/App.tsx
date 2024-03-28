import { Appbar } from "./components/AppBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./routes/Contact";
import Team from "./routes/Team";

import { CurrentCard } from "./components/cardtopright";
import { DailyCard } from "./components/DailyCard";
import { HourlyCard } from "./components/HourlyCard";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Appbar />
        </div>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Router>
      <div className=" flex flex-col mt-10 md:flex-row">
        <div className="w-[50%]">
          <CurrentCard />
          <HourlyCard />
        </div>
        <div>
          <DailyCard />
        </div>
      </div>
    </div>
  );
}

export default App;
