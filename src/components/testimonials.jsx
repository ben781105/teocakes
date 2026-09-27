import StarRating from "./starrating";
import Section from "./layout/section";
import { testimonials } from "../data/testimonials";
import { useState, useRef } from "react";

function TestimonialCard({ name, src, text, rating, status }) {
  return (
    <div className="border border-cream-dark bg-white rounded-2xl p-6 flex flex-col h-full">
      <StarRating rating={rating} />
      <p className="mt-3">"{text}"</p>

      <div className="flex items-center gap-3 mt-auto pt-6">
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          width="48"
          height="48"
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col">
          <p className="font-bold font-heading text-espresso">{name}</p>
          <span className="text-sm">{status}</span>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  };

  const goTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <Section id="testimonials" className="bg-cream">
      <div className="flex flex-col gap-3 items-center">
        <p className="font-script text-brick text-2xl lg:text-3xl text-center">
          Word on the street
        </p>
        <h2 className="font-heading font-medium text-espresso text-center">
          Loved By Our{" "}
          <span className="font-heading text-brick">Customers</span>
        </h2>
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-8 px-6 mt-10 pb-4"
      >
        {testimonials.map(({ id, name, src, text, rating, status }) => (
          <div key={id} className="snap-center shrink-0 w-full">
            <TestimonialCard
              name={name}
              src={src}
              text={text}
              rating={rating}
              status={status}
            />
          </div>
        ))}
      </div>
      <div className="md:hidden flex justify-center gap-2 mt-4">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "w-2 bg-brick" : "w-2 bg-cream-dark"
            }`}
          />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
    </Section>
  );
}

export default Testimonials;
