import React from 'react'

function HowItWorks() {
    return (
        <section className=" bg-none">
            <div className="px-4 mx-auto max-w-7xl sm:px-12 lg:px-15">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-slate-600 sm:text-4xl lg:text-5xl font-poppins">How does it work?</h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Three simple steps. One trusted expert. Your appliance back to life — faster than you think.</p>
                </div>

                <div className="relative mt-12 lg:mt-15">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12 text-slate-600">
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 1 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">Book Online</h3>
                            <p className="mt-4 text-base text-gray-600">Tell us what's broken. Fill the form or call us directly.</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 2 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">Technician Visit</h3>
                            <p className="mt-4 text-base text-gray-600">Our technician arrives at your doorstep at your preferred time.</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 3 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">Repaired & Done</h3>
                            <p className="mt-4 text-base text-gray-600">We fix it fast, cleanly, and at a fair price. Simple.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks