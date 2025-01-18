import React from 'react'
import Sou_logo from './assets/sou_logo.svg'
import Robo from './assets/Robo.svg'
import Logo from './assets/bg_2.svg'
import Bg from './assets/bg.svg'
import Countdown from 'react-countdown'
function Home() {

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
                    <img src={Logo} alt="" className='h-40 ml-16 -mt-7  ' />
                </div>
                <div className='flex items-center justify-center'>
                    <Countdown className='text-white text-[110px] font-semibold mt-10 text-center' date={Date.now() + 24 * 60

                    } />

                </div>

            </div>
        </div>
    )
}

export default Home