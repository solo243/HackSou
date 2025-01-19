import { useState } from "react";

import "./App.css";
import Home from "./Home";

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
