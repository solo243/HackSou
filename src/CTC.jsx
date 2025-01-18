import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000'; // Update this to your server's URL

const CTC = () => {
    const [timeLeft, setTimeLeft] = useState(null); // Time left in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState(null); // Store the initial countdown time

    useEffect(() => {
        const fetchStartTime = async () => {
            try {
                const response = await fetch(`${API_URL}/start-time`);
                const data = await response.json();

                if (data.startTime) {
                    const elapsedTime = Math.floor((Date.now() - data.startTime) / 1000);
                    const remainingTime = 24 * 60 * 60 - elapsedTime;
                    if (remainingTime > 0) {
                        setTimeLeft(remainingTime);
                        setInitialTime(remainingTime); // Set the initial time
                        setIsRunning(true);
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

    const startCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/start-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                const elapsedTime = Math.floor((Date.now() - data.startTime) / 1000);
                const remainingTime = 24 * 60 * 60 - elapsedTime;
                setTimeLeft(remainingTime);
                setInitialTime(remainingTime); // Store the initial time
                setIsRunning(true);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error starting countdown:', error);
        }
    };

    const resetCountdown = async () => {
        try {
            const response = await fetch(`${API_URL}/start-time`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTimeLeft(null); // Reset the time on the frontend
                setIsRunning(false); // Stop the countdown
                setInitialTime(null); // Clear the initial time
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
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-semibold mb-4">Countdown Timer</h1>
            <h2 className="text-3xl font-bold mb-6">
                {timeLeft !== null ? (timeLeft > 0 ? formatTime(timeLeft) : 'Time is up!') : 'Press Start'}
            </h2>
            <div className="space-x-4">
                <button
                    onClick={startCountdown}
                    disabled={isRunning || timeLeft === 0}
                    className={`px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${isRunning || timeLeft === 0 ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                >
                    Get Started
                </button>
                <button
                    onClick={resetCountdown}
                    disabled={!isRunning}
                    className={`px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition ${!isRunning ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CTC;
