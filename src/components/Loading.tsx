import { WiCloud, WiDaySunny, WiRaindrops } from "react-icons/wi";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative flex items-center justify-center">
        <WiCloud className="w-16 h-16 text-blue-300 animate-float" />
        <WiDaySunny className="w-12 h-12 text-yellow-400 absolute top-0 right-0 animate-spin-slow" />
        <WiRaindrops className="w-8 h-8 text-blue-400 absolute -bottom-2 left-4 animate-bounce" />
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-blue-500/10 rounded-full blur-xl"></div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="text-blue-600 font-medium text-lg">Loading weather data</div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}