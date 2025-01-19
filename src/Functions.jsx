import { useEffect, useState } from "react";



const countDownFunction = () => {
    const [timeLeft, setTimeLeft] = useState(null); // Time left in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer is running
    const [isPaused, setIsPaused] = useState(false); // Timer is paused





    const API_URL = "http://localhost:5000"

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

    const formatTime1 = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return (
            <span className="flex mb-10 font-semibold space-x-2 justify-center  items-center  ">
                <span className="text-8xl">{hrs.toString().padStart(2, '0')}</span>
                <span className="text-8xl">:</span>
                <span className="text-8xl">{mins.toString().padStart(2, '0')}</span>
                <span className="text-8xl">:</span>
                <span className="text-8xl">{secs.toString().padStart(2, '0')}</span>
            </span>
        );
    };

    return { timeLeft, setTimeLeft, isPaused, setIsPaused, isRunning, setIsRunning, startCountdown, formatTime1 }

}


export default countDownFunction;

