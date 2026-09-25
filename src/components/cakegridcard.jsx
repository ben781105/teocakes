import { memo } from "react";
import { Plus } from "lucide-react";
import { formatPrice } from "../data/numberFormatter";

const CakeGridCard = memo(function CakeGridCard({ cake, onSelect }) {
  const { name, price, image, thumbnail } = cake;

  return (
    <div
      onClick={() => onSelect(cake)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(cake);
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border-cream bg-white shadow-md hover:shadow-lg transition-transform duration-300 lg:hover:scale-103 cursor-pointer"
    >
      <div className="relative aspect-square sm:aspect-video md:aspect-square overflow-hidden">
        <img
          src={thumbnail || image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 right-3 translate-y-1/2 z-10 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110 bg-brick text-cream border-3 border-white rounded-full p-2">
          <Plus className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-1 flex-col justify-center">
        <h3 className="font-medium">{name}</h3>
        <p className="font-bold text-brick">
          Ugx&nbsp;{formatPrice(price ?? 0)}
        </p>
      </div>
    </div>
  );
});

export default CakeGridCard;
