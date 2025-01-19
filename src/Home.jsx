import React, { useEffect } from "react";
// import Sou_logo from "./assets/sou_logo.svg";
// import Robo from "./assets/Robo.svg";
// import Logo from "./assets/bg_2.svg";
// import Bg from "./assets/bg.svg";
import countDownFunction from "./Functions";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
// import Countdown from 'react-countdown'
// import { setTimeLeft, timeLeft } from './Functions'

const API_URL = "http://localhost:5000";

function Home() {
  const {
    formatTime1,
    timeLeft,
    setTimeLeft,
    isPaused,
    setIsPaused,
    isRunning,
    setIsRunning,
    startCountdown,
  } = countDownFunction();

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await fetch(`${API_URL}/start-time`);
        const data = await response.json();

        if (data.isPaused) {
          setTimeLeft(data.remainingTime);
          setIsRunning(false);
          setIsPaused(true);
        } else if (data.startTime) {
          const elapsedTime = Math.floor((Date.now() - data.startTime) / 1000);
          const remainingTime = 24 * 60 * 60 - elapsedTime;
          if (remainingTime > 0) {
            setTimeLeft(remainingTime);
            setIsRunning(true);
            setIsPaused(false);
          } else {
            setTimeLeft(0);
          }
        }
      } catch (error) {
        console.error("Error fetching start time:", error);
      }
    };

    fetchStartTime();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}

export default Home;
