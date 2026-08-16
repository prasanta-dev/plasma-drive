import React, { useState } from 'react'
import motor_Coil from '../../assets/work_img/motor_Coil.jpg'
import microwaves from '../../assets/work_img/microwaves.png'
import geyser from '../../assets/work_img/geyser.jpeg'
import indection from '../../assets/work_img/indection.jpg'
import farata_fan from '../../assets/work_img/farata_fan.jpg'
import mixer from '../../assets/work_img/mixer.jpg'
import invater from '../../assets/work_img/invater.jpg'
import coil from '../../assets/work_img/coil.jpg'
import Drill from '../../assets/work_img/Drill.jpg'

// Reusable card with skeleton loader
function WorkCard({ src, alt, title, description, className = '', imgClassName = 'w-full h-48 object-cover' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg group ${className}`}>
      {/* Skeleton — shown until image loads */}
      {!loaded && (
        <div className={`${imgClassName} bg-slate-200 animate-pulse`}>
          <div className="absolute inset-0 flex flex-col justify-end p-4 gap-2">
            <div className="h-4 w-2/3 bg-slate-300 rounded" />
            {description && <div className="h-3 w-full bg-slate-300 rounded" />}
            {description && <div className="h-3 w-4/5 bg-slate-300 rounded" />}
          </div>
        </div>
      )}

      {/* Actual image — invisible until loaded */}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {description ? (
            <>
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <p className="text-white text-sm">{description}</p>
            </>
          ) : (
            <h4 className="text-xl font-bold text-white">{title}</h4>
          )}
        </div>
      </div>
    </div>
  )
}

function Our_work() {
  return (
    <div className="bg-none">
      <div className="container mx-auto sm:px-20 px-4">
        <h1 className="font-poppins text-2xl font-bold text-slate-600 sm:text-4xl lg:text-4xl py-5 sm:py-8">
          See <span className="text-[#4abafa] underline decoration-4">Our Work</span> Which Will Amaze You!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-2xl p-4">

          {/* Large featured card — 2x2 */}
          <WorkCard
            src={motor_Coil}
            alt="motor_Coil"
            title="Motor Coil Winding"
            description="Motor coil winding is the process of wrapping insulated copper or aluminum wire around a motor's core."
            className="md:col-span-2 md:row-span-2"
            imgClassName="w-full h-full object-cover"
          />

          <WorkCard src={microwaves}  alt="microwaves"     title="Microwaves Repair"    />
          <WorkCard src={geyser}      alt="geyser"         title="Geyser Repair"         />
          <WorkCard src={indection}   alt="Induction"      title="Induction Repair"      />
          <WorkCard src={farata_fan}  alt="Farrata Fan"    title="Farrata Fan Repair"    />
          <WorkCard src={mixer}       alt="Mixer"          title="Mixer Repair"          />
          <WorkCard src={invater}     alt="invater"        title="Inverter Repair"       />
          <WorkCard src={coil}        alt="coil"           title="Ceiling Fan Coil"      />
          <WorkCard src={Drill}       alt="drill machine"  title="Drill Machine Repair"  />

        </div>
      </div>
    </div>
  )
}

export default Our_work