import { useEffect, useState } from "react";

import "./App.css";
import Home from "./Home";
import SocialWall from "./components/SocialWall";
import CountdownTimer from "./components/BackUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wall" element={<SocialWall />} />
      </Routes>
    </Router>
  );
}

export default App;
