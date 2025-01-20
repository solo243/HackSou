import React from "react";
import heroImage from "../assets/bg_2.svg";
import obj from "../assets/object.png";
import Counter from "./CounterTestVercel";
import BgFinal from '../assets/finalone.svg'


const HeroSection = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-10 relative">
      <img src={BgFinal} alt="" className="flex items-center justify-center w-[490px] -mt-6" />
      <Counter />
      <img
        src={obj}
        alt=""
        className="absolute w-[200px] right-4 -bottom-11 rotate-infinite "
      />
    </div>
  );
};

export default HeroSection;
