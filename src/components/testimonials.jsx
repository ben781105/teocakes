import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarRating from "./starRating";
import Section from "./layout/section";
import { testimonials } from "../data/testimonials";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

function TestimonialCard({ name, src, text, rating, status }) {
  return (
    <div className="border border-cream-dark bg-white rounded-2xl p-6 flex flex-col h-full">
      <StarRating rating={rating} />
      <p className="mt-3">"{text}"</p>

      <div className="flex items-center gap-3 mt-auto pt-6">
        <div>
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="font-bold font-heading text-espresso">{name}</p>
          <span className="text-sm">{status}</span>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const isMobile = useIsMobile(768);

  return (
    <Section id="testimonials" className="bg-cream">
      <div className="flex flex-col gap-3 items-center">
        <p className="font-script text-brick text-2xl  lg:text-3xl text-center">
          Word On The Street
        </p>
        <h2 className="font-heading font-medium text-gray-900 text-center">
          Loved by our Customers
        </h2>
      </div>

      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          className="testimonial-swiper mt-10 pb-10"
        >
          {testimonials.map(({ id, name, src, text, rating, status }) => (
            <SwiperSlide key={id}>
              <TestimonialCard
                name={name}
                src={src}
                text={text}
                rating={rating}
                status={status}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {testimonials.map(({ id, name, src, text, rating, status }) => (
            <TestimonialCard
              key={id}
              name={name}
              src={src}
              text={text}
              rating={rating}
              status={status}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

export default Testimonials;
