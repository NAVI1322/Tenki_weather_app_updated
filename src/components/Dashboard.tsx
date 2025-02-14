import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo/logo.jpeg";

export function DashBoard() {
  const navigate = useNavigate()
  return (
    <div className="md:flex md:flex-col text-neutral-800 md:h-screen hidden transition-all duration-300 px-6 py-6 bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="flex flex-row items-center justify-start gap-4 mb-20 hover:scale-105 transition-transform duration-300"> 
        <div className="relative">
          <img src={logo} alt="" className="max-w-70 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce shadow-lg"></div>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Tenki</div>
      </div>

      <div className="p-4 mt-6 rounded-xl cursor-pointer group hover:bg-white/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-200">
        <div className="flex flex-row space-x-5 items-center">
          <div className="transform group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
              className="w-6 h-6 text-blue-400 group-hover:text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <div className="text-blue-600 text-lg font-medium group-hover:translate-x-1 transition-transform duration-300" 
            onClick={() => navigate('/')}>
            Dashboard
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="p-4 rounded-xl bg-blue-100/50 backdrop-blur-sm">
          <div className="text-sm text-blue-600 font-medium">Weather Updates</div>
          <div className="text-xs text-blue-400 mt-1">Stay tuned for the latest forecasts!</div>
        </div>
      </div>
    </div>
  );
}
