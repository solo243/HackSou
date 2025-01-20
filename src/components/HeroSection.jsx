import React from "react";
import heroImage from "../assets/bg_2.svg";
import obj from "../assets/object.png";
import Counter from "./Test1";


const HeroSection = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-10 relative">
      <img src={heroImage} alt="" className=" w-[320px] pb-[-10px]" />
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
