import { Star } from "lucide-react";

const MARQUEE_ITEMS = [
  "Premium Taste",
  "Best Quality",
  "Fresh Ingredients",
  "Made with Love",
];

function Marquee() {
  return (
    <div className="bg-espresso text-cream overflow-hidden py-5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={`${rep}-${i}`}
                className=" font-heading flex text-xl items-center text-white  font-medium tracking-wide px-6 whitespace-nowrap gap-7"
              >
                <Star size={14} className="mr-2 fill-white" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 18s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
