import React from "react";
import heroImage from "../assets/bg_2.svg";
import Counter from "./counter";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <img src={heroImage} alt="" className=" w-[320px] pb-[-10px]" />
      <Counter />
    </div>
  );
};

export default HeroSection;
