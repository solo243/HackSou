import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function Home() {

  return (
    <div className="bg h-screen w-full object-cover overflow-x-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default Home;
