import { Appbar } from "./components/AppBar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./routes/Contact";
import Team from "./routes/Team";
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { CurrentCard } from "./components/cardtopright";
import { DailyCard } from "./components/DailyCard";
import { useState } from "react";

function App() {

  return (
    <RecoilRoot>
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
          <div>gurtaj part</div>
        </div>
        <div>
          <DailyCard />
        </div>
      </div>
    </div>
    </RecoilRoot>
  );
}

export default App;
