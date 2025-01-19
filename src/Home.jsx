import React, { useEffect } from 'react'
import Sou_logo from './assets/sou_logo.svg'
import Robo from './assets/Robo.svg'
import Logo from './assets/bg_2.svg'
import Bg from './assets/bg.svg'
import countDownFunction from './Functions'
// import Countdown from 'react-countdown'
// import { setTimeLeft, timeLeft } from './Functions'

const API_URL = 'http://localhost:5000';


function Home() {
    const { formatTime1, timeLeft, setTimeLeft, isPaused, setIsPaused, isRunning, setIsRunning, startCountdown } = countDownFunction();

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

    return (
        <div className=" w-full   ">
            <img src={Bg} alt="" className='absolute  -z-10 top-0 left-0  object-fill' />
            <nav className='px-7  items-center flex justify-between'>
                <div >
                    <img src={Robo} alt="" className='h-[120px]  bg-cover' />
                </div>
                <div >
                    <img src={Sou_logo} alt="" className='h-16  bg-cover' />
                </div>
            </nav>
            <div>
                <div className='flex items-center justify-center w-full '>
                    <img src={Logo} alt="" className='h-36 ml-16 -mt-10  ' />
                </div>
                <div className='flex text-white pt-20  items-center justify-center'>
                    {timeLeft !== null ? (timeLeft > 0 ? formatTime1(timeLeft) : 'Time is up!') : 'Press Start'}
                </div>
                <button
                    onClick={startCountdown}
                    disabled={isRunning || isPaused || timeLeft !== null}
                    className="px-6 py-3 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                >
                    Start
                </button>
            </div>
        </div>
    )
}

export default Home