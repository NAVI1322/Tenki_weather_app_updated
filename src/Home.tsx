import { CurrentCard } from "./components/CurrentCard";
import { DailyCard } from "./components/DailyCard";
import { HourlyCard } from "./components/HourlyCard";

const Home = () => {
  return (
    <div className=" flex flex-col mt-10 md:flex-row">
      <div className="md:w-[50%] flex items-center flex-col">
        <CurrentCard />
      </div>
    </div>
  );
};

export default Home;
