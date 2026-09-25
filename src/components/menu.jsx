import { useState, useEffect, useMemo, memo } from "react";
import { getCakes } from "../services/cakeService";
import Section from "./layout/section";
import CakeGridCard from "./cakegridcard";
import CakeCardSkeleton from "./skeletons/cakeCardSkeleton";
import PriceFilterPills from "./pricefilterpills";
import { useNavigate } from "react-router-dom";

const CakeGrid = memo(function CakeGrid({ cakes, onSelect, loading }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 ">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <CakeCardSkeleton key={i} />)
        : cakes.map((cake) => (
            <CakeGridCard key={cake.id} cake={cake} onSelect={onSelect} />
          ))}
    </div>
  );
});

function Menu() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCakes();
        setCakes(data);
      } catch (err) {
        console.error("error fetching menu data", err);
        setError("Couldn't load the menu right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const filteredCakes = useMemo(() => {
    let result = cakes;
    if (priceRange.min)
      result = result.filter((c) => parseFloat(c.price) >= priceRange.min);
    if (priceRange.max)
      result = result.filter((c) => parseFloat(c.price) <= priceRange.max);
    return result;
  }, [cakes, priceRange]);

  const handleSelectedCake = (cake) => {
    navigate(`/${cake.category_slug}/${cake.slug}`);
  };

  return (
    <>
      <section className="bg-espresso py-10 ">
        <div className="w-full max-w-6xl px-6 md:px-8 mx-auto  overflow-hidden">
          {loading ? (
            <div className="h-8 w-48 rounded bg-espresso animate-pulse" />
          ) : (
            <>
              <p className="font-script text-brick text-2xl  lg:text-3xl ">
                Make your Order
              </p>
              <h2 className="text-cream  font-medium mb-3">Our Menu Card</h2>
              <p className=" text-white max-w-xl">
                Filter this menu card by price and open any cake to place your
                order.
              </p>
            </>
          )}
        </div>
      </section>
      <Section id="menu" className="bg-cream">
        <div className="flex flex-col gap-4 md:gap-6 h-fit m-auto max-w-6xl py-8 md:py-12 rounded-lg">
          {error && !loading ? (
            <p className="text-center text-brick text-sm py-10">{error}</p>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col w-full">
                <PriceFilterPills
                  priceRange={priceRange}
                  onSelect={setPriceRange}
                />
                <CakeGrid
                  cakes={filteredCakes}
                  onSelect={handleSelectedCake}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

export default Menu;
