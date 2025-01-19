import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home";
import CountdownTimer from "./CTC";
import CTC from "./CTC";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg h-screen w-full object-cover overflow-x-hidden">
        <Home />
      </div>
    </>
  );
}

export default App;
