import React from 'react'
import bulb2 from '../../assets/bulb2.jpg'
import logo2 from '../../assets/Logo2.png'

function WhatWeDo() {
    return (
        <div className='flex flex-wrap items-start justify-center sm:mt-10 mt-5 gap-8 px-5 sm:gap-15'>
            <div className='w-80 sm:w-100 relative group cursor-help'>
                {/* Glow layer behind the bulb */}
                <div className='absolute inset-0 rounded-full bg-amber-400/0 group-hover:bg-amber-400/40 blur-3xl transition-all duration-700 scale-75 group-hover:scale-110'></div>

                <img
                    className='w-80 sm:w-100 relative brightness-75 contrast-90 saturate-75 
                       group-hover:brightness-110 group-hover:contrast-110  group-hover:saturate-150 
                       transition-all duration-500 ease-in-out
                       drop-shadow-none group-hover:drop-shadow-[0_0_40px_rgba(255,191,0,0.7)]'
                    src={bulb2} alt=""
                />

                <div className='hidden sm:block absolute w-25 h-25 rounded-full -right-10 top-6 bg-orange-200'>
                    <img className='' src={logo2} alt="logo" />
                </div>
            </div>
            <div className='w-100'>
                <h1 className='sm:text-5xl text-4xl sm:mb-8 mb-3 italic opacity-60 font-poppins'>What We Do ...</h1>
                <p className='text-base text-justify'>At our shop, we provide a wide range of expert repair services for all your electrical appliances, including: Ceiling Fans, Table Fans, Water Pumps and Motors, Mixer Grinders, Induction Cooktops, Microwaves, Water Geysers, Electric Irons, Inverters and Stabilizers, Inverter Batteries, Pressure Cookers many more items. Our experienced technicians are here to ensure your appliances are running smoothly and efficiently. If you have a specific appliance in need of repair, feel free to ask ! </p>

                <div className='flex justify-center my-5'>
                    <hr className="sm:w-50 w-30 h-1 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
                </div>
            </div>
        </div>
    )
}

export default WhatWeDo