import React from 'react'
import Hero from './Hero'
import PopularServices from './PopularServices'
import WhatWeDo from './WhatWeDo'
import LogoMarquee from '../../components/LogoMarquee/LogoMarquee'
import cg from '../../assets/Logos/crompton.svg'
import havells from '../../assets/Logos/Havells.svg'
import bajaj from '../../assets/Logos/bajaj.svg'
import orient from '../../assets/Logos/orient.svg'
import usha from '../../assets/Logos/USHA.svg'
import Godrej from '../../assets/Logos/Godrej_Logo.svg'
import Voltas from '../../assets/Logos/Voltas_logo.svg'
import Ifb from '../../assets/Logos/IFB.jpeg'
import Philips from '../../assets/Logos/Philips.svg'
import Bosch from '../../assets/Logos/Bosch.svg'
import Hitachi from '../../assets/Logos/Hitachi.svg'
import Haier from '../../assets/Logos/Haier.svg'
import cri from '../../assets/Logos/cri-logo.png'
import Stats from './Stats'
import HowItWorks from './HowItWorks'
import OurWork from './OurWork'
import Reviews from './Reviews'


const logos = [
  { name: "Crompton", src: cg },
  { name: "Havells", src: havells },
  { name: "Bajaj", src: bajaj },
  { name: "Orient", src: orient },
  { name: "Usha", src: usha },
  { name: "Godrej", src: Godrej },
  { name: "Voltas", src: Voltas },
  { name: "Philips", src: Philips },
  { name: "Bosch", src: Bosch },
  { name: "Hitachi", src: Hitachi },
  { name: "Haier", src: Haier },
  { name: "CRI", src: cri },
  { name: "Haier", src: Haier },
];

function Home() {
  return (
    <div>
      <section><Hero /></section>
      <section><PopularServices /></section>
      <section><WhatWeDo /></section>
      <div className='flex justify-center sm:my-10 my-5'>
        <hr className="w-100 h-1 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
      </div>
      <section><Stats /></section>
      <section>
        <LogoMarquee logos={logos} speed='normal' label='"Brands We Repair"' />
      </section>
      <div className='flex justify-center sm:my-10 my-5'>
        <hr className="w-100 h-1 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
      </div>
      <section><HowItWorks /></section>
      <div className='flex justify-center sm:my-10 my-5'>
        <hr className="w-100 h-1 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
      </div>
      <section><OurWork /></section>
      <div className='flex justify-center sm:my-10 my-5'>
        <hr className="w-100 h-1 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
      </div>
      <section><Reviews /></section>
    </div>

  )
}

export default Home