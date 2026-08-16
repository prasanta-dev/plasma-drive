import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import heroImg1 from '../../assets/heroImg1.jpg'
import heroImg2 from '../../assets/heroImg2.jpg'
import heroImg3 from '../../assets/heroImg3.jpg'

const images = [heroImg2, heroImg1, heroImg3]
const slideTexts = [
  'We Restore What Others Ignore !',
  'The Right Tools. The Right Hands.',
  'Broken? We Bring It Back . . .',
]

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedMap, setLoadedMap] = useState({})

  const handleLoad = (idx) => {
    setLoadedMap(prev => ({ ...prev, [idx]: true }))
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-52 sm:h-72 md:h-96 lg:h-125">
              {/* Skeleton shown until image loads */}
              {!loadedMap[idx] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
               <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />
              <span className='absolute sm:bottom-8 bottom-5 left-3 text-[23px] sm:text-2xl md:text-4xl lg:text-5xl text-white font font-poppins font-bold z-10'>{slideTexts[idx]}</span>
              <img
                src={img}
                alt={`slide-${idx}`}
                onLoad={() => handleLoad(idx)}
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                  loadedMap[idx] ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute sm:bottom-4 bottom-2 left-10 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero