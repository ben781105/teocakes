import { useState, useEffect, useCallback, memo } from "react";
import { getFavourites } from "../services/favouriteService";
import Section from "./layout/section.jsx";
import { Plus } from "lucide-react";
import CakeDetail from "./cakedetail.jsx";
import { formatPrice } from "../data/numberFormatter.js";
import CardSkeleton from "./skeletons/favouriteCardSkeleton.jsx";

const FavouriteCard = memo(function FavouriteCard({ cake, onSelect }) {
  const { id, image, name, price, description } = cake;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border-cream  bg-white shadow-md hover:shadow-lg transition-transform duration-300 lg:hover:scale-103">
      <div className="relative aspect-square sm:aspect-video md:aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          type="button"
          aria-label={`Add ${name} to selection`}
          onClick={() => onSelect({ id, image, name, price, description })}
          className="absolute bottom-3 cursor-pointer right-3 translate-y-1/2 z-10 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110 font-medium bg-brick text-cream hover:text-white hover:bg-brick-hover border-3 border-white rounded-full p-2"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="z-5 p-3 md:p-4 flex flex-1 flex-col justify-center">
        <h3>{name}</h3>
        <p className="font-bold  text-brick">Ugx&nbsp;{formatPrice(price)}</p>
      </div>
    </div>
  );
});

const FavouriteGrid = memo(function FavouriteGrid({
  cakes,
  onSelect,
  isLoading,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-8">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        : cakes.map((cake) => (
            <FavouriteCard key={cake.id} cake={cake} onSelect={onSelect} />
          ))}
    </div>
  );
});

function Favourites() {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseDetail = useCallback(() => setSelectedCake(null), []);

  useEffect(() => {
    const fetchFavourites = async () => {
      setIsLoading(true);
      try {
        const data = await getFavourites();
        setCakes(data);
      } catch (error) {
        console.error("error fetching favourites", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  return (
    <Section id="favourites" className="bg-cream">
      <div className="flex flex-col">
        <p className=" font-script text-brick text-2xl  lg:text-3xl self-center">
          Customer Favourites
        </p>
        <h2 className="text-center">Our Delicious Cakes</h2>
        <FavouriteGrid
          cakes={cakes}
          onSelect={setSelectedCake}
          isLoading={isLoading}
        />
      </div>

      {selectedCake && (
        <CakeDetail cake={selectedCake} onClose={handleCloseDetail} />
      )}
    </Section>
  );
}

export default Favourites;
