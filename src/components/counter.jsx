import React, { useEffect, useState } from "react";

const Counter = () => {
  // Initialize state with the value from localStorage or false if not set
  const [hide, setHide] = useState(() => {
    const storedValue = localStorage.getItem("hide");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Function to toggle the hide state and update localStorage
  const btnHide = () => {
    setHide((prevHide) => {
      const newHide = !prevHide;
      localStorage.setItem("hide", JSON.stringify(newHide)); // Update localStorage
      return newHide;
    });
  };

  // Update localStorage whenever `hide` changes
  useEffect(() => {
    localStorage.setItem("hide", JSON.stringify(hide));
  }, [hide]);

  return (
    <div>
      <h1 className="text-9xl text-white font-semibold">00:00:00</h1>
      <button
        className={`bg-purple-500 flex justify-between items-center mx-auto px-7 py-1 rounded-lg text-2xl mt-5 text-white uppercase font-semibold ${
          hide ? "hidden" : "block"
        }`}
        onClick={btnHide}
      >
        Start
      </button>
    </div>
  );
};

export default Counter;
