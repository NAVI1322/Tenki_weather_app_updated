import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css";
import "./index.css";
import LandingPage from "./routes/LandingPage"


function App()

{

  return(
   <BrowserRouter>
   <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white p-6">
    <main className="max-w-7xl mx-auto">
     <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/dashboard" element={<LandingPage/>}></Route>
     </Routes>
    </main>
   </div>
  </BrowserRouter>)
}


export default App