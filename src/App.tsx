import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css";
import "./index.css";
import Team from "./routes/Team"
import LandingPage from "./routes/LandingPage"


function App()

{

  return(
   <BrowserRouter>
   <Routes>
    <Route path="/dashboard" element={<LandingPage/>}></Route>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/Team" element={<Team />}></Route>
    
   </Routes>
  </BrowserRouter>)
}


export default App