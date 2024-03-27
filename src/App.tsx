import { Appbar } from "./components/AppBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./routes/Contact";
import Team from "./routes/Team";
import { currentWeather} from "./services/weatherData";
import { CurrentCard } from "./components/cardtopright";



function App() {

 currentWeather("toronto");

  return (

    <div>
      <CurrentCard />
    </div>
    // <div>
    //   <Router>
    //     <div>
    //       <Appbar/>
    //     </div>
    //     <Routes>
    //       <Route path="/contact" element={<Contact/>}/>
    //       <Route path="/team" element={<Team/>}/>
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;
