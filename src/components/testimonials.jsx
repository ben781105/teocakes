import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import StarRating from './StarRating'
import Section from './layout/section'
import {testimonials} from '../data/testimonials'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

function TestimonialCard({ name, src, text, rating, status }) {
  return (
    <div className='border rounded-2xl p-6 flex flex-col h-full'>
      <StarRating rating={rating} />
      <p className='mt-3 text-sm text-gray-600'>"{text}"</p>

      <div className='flex items-center gap-3 mt-auto pt-6'>
        <div>
          <img src={src} alt={name} className='w-12 h-12 rounded-full object-cover' />
        </div>

        <div className='flex flex-col'>
          <span className='font-medium'>{name}</span>
          <span className='text-sm text-gray-500'>{status}</span>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const isMobile = useIsMobile(768)

  return (
    <Section id='testimonials'>
      <div className='flex flex-col gap-3 items-center'>
        <span>Word On The Street</span>
        <h1 className='text-center'>Our Customers Feedback</h1>
      </div>

      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          className='testimonial-swiper mt-10 pb-10'
        >
          {testimonials.map(({ id, name, src, text, rating, status }) => (
            <SwiperSlide key={id}>
              <TestimonialCard name={name} src={src} text={text} rating={rating} status={status} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {testimonials.map(({ id, name, src, text, rating, status }) => (
            <TestimonialCard key={id} name={name} src={src} text={text} rating={rating} status={status} />
          ))}
        </div>
      )}
    </Section>
  )
}

export default Testimonials