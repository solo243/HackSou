import React from "react";
import navbarImage1 from "../assets/soulogo.svg";
import navbarImage2 from "../assets/Robo.svg";

const Hello = () => {
  return (
    <>
      <section className="flex justify-between items-center">
        <div>
          <img
            src={navbarImage2}
            alt=""
            className="h-[150px] w-[200px] object-fill "
          />
        </div>
        <div>
          <img
            src={navbarImage1}
            alt=""
            className=" w-[280px] object-fill mr-10"
          />
        </div>
      </section>
    </>
  );
};

export default Hello;
