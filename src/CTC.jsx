import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000';

const CTC = () => {
    const [timeLeft, setTimeLeft] = useState(null); // Time left in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer is running
    const [isPaused, setIsPaused] = useState(false); // Timer is paused

    //TODO Fetch initial timer state from the backend
    useEffect(() => {
        const fetchStartTime = async () => {
            try {
                const response = await fetch(`${API_URL}/start-time`);
                const data = await response.json();

                if (data.isPaused) {
                    setTimeLeft(data.remainingTime);
                    setIsRunning(false);
                    setIsPaused(true);
                } else if (data.startTime) {
                    const elapsedTime = Math.floor((Date.now() - data.startTime) / 1000);
                    const remainingTime = 24 * 60 * 60 - elapsedTime;
                    if (remainingTime > 0) {
                        setTimeLeft(remainingTime);
                        setIsRunning(true);
                        setIsPaused(false);
                    } else {
                        setTimeLeft(0);
                    }
                }
            } catch (error) {
                console.error('Error fetching start time:', error);
            }
        };

        fetchStartTime();
    }, []);

    //TODO Timer countdown effect
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    //TODO Start the countdown (new timer)
    const startCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/start-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setTimeLeft(24 * 60 * 60); //TODO Set to 24 hours
                setIsRunning(true);
                setIsPaused(false);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error starting countdown:', error);
        }
    };

    //TODO Resume the countdown
    const resumeCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/start-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setIsRunning(true);
                setIsPaused(false);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error resuming countdown:', error);
        }
    };

    //TODO Pause the countdown
    const pauseCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/pause-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setTimeLeft(data.remainingTime);
                setIsRunning(false);
                setIsPaused(true);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error pausing countdown:', error);
        }
    };

    //TODO Reset the countdown
    const resetCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/start-time`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTimeLeft(null);
                setIsRunning(false);
                setIsPaused(false);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error resetting countdown:', error);
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hrs.toString().padStart(2, '0')} : ${mins
            .toString()
            .padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    const formatTime1 = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return (
            <span className="flex mb-10 space-x-2 justify-center  items-center text-5xl ">
                <span className="text-4xl">{hrs.toString().padStart(2, '0')}</span>
                <span className="text-4xl">:</span>
                <span className="text-4xl">{mins.toString().padStart(2, '0')}</span>
                <span className="text-4xl">:</span>
                <span className="text-4xl">{secs.toString().padStart(2, '0')}</span>
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-semibold mb-4">Countdown Timer</h1>
            {timeLeft !== null ? (timeLeft > 0 ? formatTime1(timeLeft) : 'Time is up!') : 'Press Start'}


            <div className="space-x-4">
                <button
                    onClick={startCountdown}
                    disabled={isRunning || isPaused || timeLeft !== null}
                    className="px-6 py-3 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                >
                    Start
                </button>
                <button
                    onClick={resumeCountdown}
                    disabled={isRunning || !isPaused}
                    className="px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                    Resume
                </button>
                <button
                    onClick={pauseCountdown}
                    disabled={!isRunning}
                    className="px-6 py-3 rounded-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                >
                    Pause
                </button>
                <button
                    onClick={resetCountdown}
                    disabled={!isRunning && !isPaused}
                    className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CTC;
