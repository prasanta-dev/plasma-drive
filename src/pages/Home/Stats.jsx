import React from 'react'
import { SlBadge } from "react-icons/sl";
import { MdHandyman } from "react-icons/md";
import { MdGroups } from "react-icons/md";


function Stats() {
    return (
        <div>
            <section className="bg-none dark:bg-gray-800 sm:px-15 mb-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-500">
                    <div className="mx-auto max-w-2xl md:text-center">
                        <h2 className="font-display text-3xl tracking-tight text-slate-700 dark:text-white sm:text-4xl font-poppins">The Faster, Affordable, Better
                            Solution</h2>
                        <p className="mt-4 text-lg tracking-tight dark:text-gray-300">We have experience repairing appliances from all major brands you trust at home.</p>
                    </div>
                    <ul role="list"
                        className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-5 lg:max-w-none lg:grid-cols-3 text-slate-500">
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                <li>
                                    <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 hover:text-slate-900 transition duration-300 ease-in">
                                        <span className='text-2xl'><SlBadge /></span>
                                        <blockquote className="relative p-3">
                                            <p className="text-6xl font-bold tracking-tight dark:text-white">42+</p>
                                        </blockquote>
                                        <figcaption className="text-center">
                                            <div className="font-display dark:text-white font-bold"> Years of Experience </div>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                <li>
                                    <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 hover:text-slate-900 transition duration-300 ease-in">                                                   
                                      <span className='text-2xl'><MdHandyman /></span>                               
                                        <blockquote className="relative p-3">
                                            <p className="text-6xl font-bold tracking-tight dark:text-white">60+</p>
                                        </blockquote>                                   
                                        <figcaption className="text-center">
                                            <div className="font-display dark:text-white font-bold">Appliance Types We Repair
                                            </div>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                <li>
                                    <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 hover:text-slate-900 transition duration-300 ease-in">
                                        <span className='text-2xl'><MdGroups /></span>
                                        <blockquote className="relative p-3">
                                            <p className="text-6xl font-bold tracking-tight dark:text-white">50K+</p>
                                        </blockquote>
                                        <figcaption className="text-center">
                                            <div className="font-display dark:text-white font-bold">Happy Customers</div>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Stats