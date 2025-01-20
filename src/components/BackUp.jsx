import React, { useState, useEffect } from "react";

function CountdownTimer() {
    // State Initialization
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem("countdownTime");
        return savedTime ? parseInt(savedTime) : 1 * 20 * 10; // Default: 24 hours in seconds
    });

    const [isRunning, setIsRunning] = useState(() => {
        const savedRunningState = localStorage.getItem("isRunning");
        return savedRunningState === "true"; // Restore running state
    });

    // Save `timeLeft` and `isRunning` in localStorage
    useEffect(() => {
        localStorage.setItem("countdownTime", timeLeft);
        localStorage.setItem("isRunning", isRunning);
    }, [timeLeft, isRunning]);

    // Countdown logic
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isRunning, timeLeft]);

    // Convert seconds to HH:MM:SS format
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Start the timer
    const handleStart = () => {
        if (timeLeft > 0) setIsRunning(true);
    };

    // Pause the timer
    const handlePause = () => {
        setIsRunning(false);
    };

    // Reset the timer
    const handleReset = () => {
        setIsRunning(false);
        const defaultTime = 4200  //Change te time here 
        setTimeLeft(defaultTime);
        localStorage.setItem("countdownTime", defaultTime);
        localStorage.setItem("isRunning", false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-purple-900 to-black text-white">
            <h1 className="text-4xl font-bold mb-6">24-Hour Countdown Timer</h1>
            <div className="text-6xl font-mono mb-8">{formatTime(timeLeft)}</div>
            <div className="flex space-x-4">
                <button
                    onClick={handleStart}
                    className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded"
                >
                    Start
                </button>
                <button
                    onClick={handlePause}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold rounded"
                >
                    Pause
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default CountdownTimer;
