import React, { useEffect, useState } from "react";
import axios from 'axios';


const Counter = () => {
    const Url = "https://countdownbaclendservice.vercel.app/api/timer";
    const [startTime, setStartTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);


    //TODO: Timer duration in milliseconds (24 hours)
    const timerDuration = 24 * 60 * 60 * 1000; // 24 hours

    useEffect(() => {
        axios.get(Url)
            .then(response => {
                setStartTime(new Date(response.data.startTime));
                setIsRunning(true);
            })
            .catch(err => console.log(err));
    }, []);



    const [RemainingTIme, setIsRemainingTime] = useState(true)

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
console.log(response)
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
            if (remainingTime ? setHide(true) : handleStart())
                return newHide;
        });
    };


    const handlePress = () => {

        setHide((prevHide) => {
            const newHide = !prevHide;
            localStorage.setItem("hide", JSON.stringify(newHide));
            if (remainingTime ? setHide(true) : handleStart())
                return newHide;
        });
    }

    useEffect(() => {
        localStorage.setItem("hide", JSON.stringify(hide));
    }, [hide]);

    return (
        <div>
            <h1 className="text-[101px] pt-5 text-white font-semibold">
                {remainingTime === null ? "24:00:00" : remainingTime > 0 ? formatTime(remainingTime) : "Time's up"}
            </h1>



            <button
                className={`bg-purple-500 flex justify-between items-center mx-auto px-7 py-1 rounded-lg text-2xl mt-5 text-white uppercase font-semibold ${hide ? "hidden" : "block"}`}
                onClick={handlePress}
            >
                Start
            </button>
        </div>
    );
};

export default Counter
