// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// const Counter = () => {
//   const Url = "https://countdownbaclendservice.vercel.app/api/timer";
//   const [startTime, setStartTime] = useState(null);
//   const [remainingTime, setRemainingTime] = useState(null);
//   const [isRunning, setIsRunning] = useState(false);

//   // Timer duration in milliseconds (1 minute)
//   const timerDuration = 1 * 60 * 60 * 1000
//   // const timerDuration = 10 * 60 * 1000

//   useEffect(() => {
//     axios.get(Url)
//       .then(response => {
//         // Check if the response contains startTime
//         console.log("Received start time:", response.data.startTime);
//         setStartTime(new Date(response.data.startTime));
//         setIsRunning(true);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   useEffect(() => {
//     if (startTime) {
//       const interval = setInterval(() => {
//         const elapsed = new Date() - new Date(startTime);
//         const remaining = timerDuration - elapsed;

//         // Log the remaining time calculation for debugging
//         console.log("Elapsed time:", elapsed);
//         console.log("Remaining time:", remaining);

//         const clampedRemaining = Math.max(remaining, 0);
//         setRemainingTime(clampedRemaining);

//         if (clampedRemaining <= 0) {
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [startTime]);

//   const handleStart = async () => {
//     const response = await axios.post('https://countdownbaclendservice.vercel.app/api/start');
//     setStartTime(new Date(response.data.startTime));
//     setIsRunning(true);
//   };

//   // Convert remaining time to HH:MM:SS format
//   const formatTime = (time) => {
//     const hours = Math.floor(time / (1000 * 60 * 60)); // Hours
//     const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
//     const seconds = Math.floor((time % (1000 * 60)) / 1000); // Seconds

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const [hide, setHide] = useState(() => {
//     const storedValue = localStorage.getItem("hide");
//     return storedValue ? JSON.parse(storedValue) : false;
//   });

//   // Function to toggle the hide state and update localStorage
//   const btnHide = () => {
//     setHide((prevHide) => {
//       const newHide = !prevHide;
//       localStorage.setItem("hide", JSON.stringify(newHide)); // Update localStorage
//       handleStart();
//       return newHide;
//     });
//   };

//   // Update localStorage whenever `hide` changes
//   useEffect(() => {
//     localStorage.setItem("hide", JSON.stringify(hide));
//   }, [hide]);

//   return (
//     <div>
//       <h1 className="text-[140px]  text-white font-semibold">
//         {remainingTime > 0 ? formatTime(remainingTime) : "00:00:00"}
//       </h1>
//       <button
//         className={`bg-purple-500 flex justify-between items-center mx-auto px-7 py-1 rounded-lg text-2xl mt-5 text-white uppercase font-semibold ${hide ? "hidden" : "block"}`}
//         onClick={btnHide}
//       >
//         Start
//       </button>
//     </div>
//   );
// };

// export default Counter;




// TODO: Next code

// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// const Counter = () => {
//   const Url = "https://countdownbaclendservice.vercel.app/api/timer";
//   const [startTime, setStartTime] = useState(null);
//   const [remainingTime, setRemainingTime] = useState(null);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);

//   // Timer duration in milliseconds (1 hour)
//   // const timerDuration = 1 * 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 ms
//   const timerDuration = 2 * 60 * 1000
//   useEffect(() => {
//     axios.get(Url)
//       .then(response => {
//         console.log("Received start time:", response.data.startTime);
//         setStartTime(new Date(response.data.startTime));
//         setIsRunning(true);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   useEffect(() => {
//     if (startTime && !isFinished) {
//       const interval = setInterval(() => {
//         const elapsed = new Date() - new Date(startTime);
//         const remaining = timerDuration - elapsed;

//         console.log("Elapsed time:", elapsed);
//         console.log("Remaining time:", remaining);

//         const clampedRemaining = Math.max(remaining, 0);
//         setRemainingTime(clampedRemaining);

//         if (clampedRemaining <= 0) {
//           setIsFinished(true);
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [startTime, isFinished]);

//   const handleStart = async () => {
//     const response = await axios.post('https://countdownbaclendservice.vercel.app/api/start');
//     setStartTime(new Date(response.data.startTime));
//     setIsRunning(true);
//     setIsFinished(false);
//   };

//   const formatTime = (time) => {
//     const hours = Math.floor(time / (1000 * 60 * 60)); // Hours
//     const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
//     const seconds = Math.floor((time % (1000 * 60)) / 1000); // Seconds

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const [hide, setHide] = useState(() => {
//     const storedValue = localStorage.getItem("hide");
//     return storedValue ? JSON.parse(storedValue) : false;
//   });

//   const btnHide = () => {
//     setHide((prevHide) => {
//       const newHide = !prevHide;
//       localStorage.setItem("hide", JSON.stringify(newHide)); // Update localStorage
//       handleStart();
//       return newHide;
//     });
//   };

//   useEffect(() => {
//     localStorage.setItem("hide", JSON.stringify(hide));
//   }, [hide]);

//   return (
//     <div>
//       <h1 className="text-[140px] text-white font-semibold">
//         {
//           // Display appropriate time or messages based on the timer state
//           isRunning ? formatTime(remainingTime) : (isFinished ? "Time's up" : "24:00:00")
//         }
//       </h1>
//       <button
//         className={`bg-purple-500 flex justify-between items-center mx-auto px-7 py-1 rounded-lg text-2xl mt-5 text-white uppercase font-semibold ${hide ? "hidden" : "block"}`}
//         onClick={btnHide}
//       >
//         Start
//       </button>
//     </div>
//   );
// };

// export default Counter;

import React, { useEffect, useState } from "react";
import axios from 'axios';

const Counter = () => {
  const Url = "https://countdownbaclendservice.vercel.app/api/timer";
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  //TODO: Timer duration in milliseconds (24 hours)
  const timerDuration = 1 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    axios.get(Url)
      .then(response => {
        setStartTime(new Date(response.data.startTime));
        setIsRunning(true);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsed = new Date() - new Date(startTime);
        const remaining = timerDuration - elapsed;

        const clampedRemaining = Math.max(remaining, 0);
        setRemainingTime(clampedRemaining);

        if (clampedRemaining <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const handleStart = async () => {
    const response = await axios.post('https://countdownbaclendservice.vercel.app/api/start');
    setStartTime(new Date(response.data.startTime));
    setIsRunning(true);
  };

  // Convert remaining time to HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60)); // Hours
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
    const seconds = Math.floor((time % (1000 * 60)) / 1000); // Seconds

    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const [hide, setHide] = useState(() => {
    const storedValue = localStorage.getItem("hide");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const btnHide = () => {
    setHide((prevHide) => {
      const newHide = !prevHide;
      localStorage.setItem("hide", JSON.stringify(newHide));
      handleStart();
      return newHide;
    });
  };

  useEffect(() => {
    localStorage.setItem("hide", JSON.stringify(hide));
  }, [hide]);

  return (
    <div>
      <h1 className="text-[80px] pt-10 text-white font-semibold">
        {remainingTime === null ? "24:00:00" : remainingTime > 0 ? formatTime(remainingTime) : "Time's up"}
      </h1>
      <button
        className={`bg-purple-500 flex justify-between items-center mx-auto px-7 py-1 rounded-lg text-2xl mt-5 text-white uppercase font-semibold ${hide ? "hidden" : "block"}`}
        onClick={btnHide}
      >
        Start
      </button>
    </div>
  );
};

export default Counter;
