import React from 'react'
import aboutImg from '../../assets/aboutImg.png'
import { Link } from 'react-router-dom'
function About() {
  return (
    <section className="pt-5 overflow-hidden bg-none dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16 sm:px-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">

          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white font-poppins">Is Your Appliance Not Working? We're Here to Help!
            </h2>
            <p className="max-w-lg mt-3 text-base  text-gray-600 dark:text-gray-300 md:mt-8 text-justify">
             "Electrical Repairs Since 1982. We offer expert repair services for all types of electrical appliances, including: Ceiling Fans & Table Fan, water Pumps & Motor, mixer Grinder,induction Cooktops & Microwaves water Geysers, Irons inverters, Stabilizers, & Batteries Electric Rice cooker, Pressure Cooker with over 40 years of experience, we provide fast, reliable, and affordable service. Visit us today for all your electrical repair needs!"  
            </p>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                <span className="relative"> Have a question? </span>
              </span>
              <br className="block sm:hidden" /> Ask me on <Link to={'/contact-us'} title=""
                className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Contact Us</Link>
            </p>
          </div>

          <div>
            <img className="w-full xl:max-w-sm xl:mx-auto 2xl:origin-bottom 2xl:scale-110 mt-5 sm:ml-10" src={aboutImg} alt="image" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default About