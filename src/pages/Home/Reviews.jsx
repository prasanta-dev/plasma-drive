import { useEffect, useRef } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const testimonials = [
  {
    name: 'Priya Rajan',
    role: 'Homeowner · Kolkata',
    initials: 'PR',
    color: 'bg-emerald-100 text-emerald-800',
    text: 'Booked a deep cleaning and the team was phenomenal. Everything spotless within two hours. The whole process from booking to payment was completely seamless.',
  },
  {
    name: 'Arjun Khanna',
    role: 'Tenant · Kolkata',
    initials: 'AK',
    color: 'bg-blue-100 text-blue-800',
    text: 'The electrician arrived right on time and fixed our wiring issue in under an hour. Very professional and explained everything clearly. Will absolutely book again.',
  },
  {
    name: 'Sneha Mehta',
    role: 'Homeowner · Kolkata',
    initials: 'SM',
    color: 'bg-orange-100 text-orange-800',
    text: 'Used the plumbing service for a leaking pipe — technician was skilled, quick, and left zero mess. Pricing was transparent from the start. Really impressed.',
  },
  {
    name: 'Rohan Verma',
    role: 'Homeowner · Kolkata',
    initials: 'RV',
    color: 'bg-purple-100 text-purple-800',
    text: 'Scheduled AC servicing and the team showed up prepared. Explained the issue step by step and offered a fair quote before starting. Highly trustworthy.',
  },
]

export default function Testimonials() {
  const swiperEl = useRef(null)

  useEffect(() => {
    const swiper = new Swiper(swiperEl.current, {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1.15,
      spaceBetween: 16,
      speed: 500,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { prevEl: '#tPrev', nextEl: '#tNext' },
      breakpoints: {
        640: { slidesPerView: 1.4, spaceBetween: 20 },
        1024: { slidesPerView: 1.7, spaceBetween: 24 },
      },
    })

    return () => swiper.destroy(true, true)
  }, [])

  return (
    <section className="py-2 px-4">
      {/* Heading */}
      <p className="text-center text-xl font-medium tracking-widest uppercase text-gray-400 mb-2">
        What people say
      </p>
      <h2 className="text-center text-3xl font-serif text-gray-900 mb-10">
        Trusted by homeowners <em className="text-emerald-600">everywhere</em>
      </h2>

      {/* Swiper */}
      <div className="swiper" ref={swiperEl}>
        <div className="swiper-wrapper items-stretch">
          {testimonials.map((t, i) => (
            <div key={i} className="swiper-slide h-auto!">
              <div className="h-full bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 relative">
                {/* Decorative quote */}
                <span className="absolute top-4 right-5 text-6xl leading-none text-emerald-400 opacity-20 select-none font-serif">
                  "
                </span>

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1">{t.text}</p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination mt-6" />
      </div>

      {/* Nav buttons */}
      <div className="flex justify-center gap-3 mt-4">
        <button id="tPrev" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button id="tNext" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}