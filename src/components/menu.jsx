import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { getCakes } from "../services/cakeService";
import Section from "./layout/section";
import CakeDetail from "./cakedetail";
import { formatPrice } from "../data/numberFormatter";
import PillSkeleton from "./skeletons/pillSkeleton";
import CakeCardSkeleton from "./skeletons/cakeCardSkeleton";

const CategoryPills = memo(function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
  loading,
}) {
  if (loading) {
    return (
      <div className="flex gap-2 items-center justify-center mb-8 flex-wrap">
        {["w-16", "w-24", "w-20", "w-28", "w-16", "w-30", "w-28"].map(
          (w, i) => (
            <PillSkeleton key={i} width={w} />
          ),
        )}
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center justify-center mb-8 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-3 py-2 rounded-full border text-sm transition
            ${
              selectedCategory === category
                ? "bg-brick border-brick text-white"
                : "bg-white border-cream-dark hover:border-brick hover:bg-brick hover:text-white"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
});

const CakeCard = memo(function CakeCard({ cake, onSelect }) {
  const { name, price, image } = cake;

  return (
    <div
      onClick={() => onSelect(cake)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(cake);
      }}
      className="flex items-center gap-4 bg-white rounded-xl cursor-pointer px-3 py-3 hover:shadow-xl transition-all duration-300 hover:scale-x-103"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="w-16 h-16 object-cover rounded-full shrink-0"
      />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-brick">Ugx&nbsp;{formatPrice(price ?? 0)}</p>
      </div>
    </div>
  );
});

const CakeList = memo(function CakeList({ cakes, onSelect, loading }) {
  return (
    <div className="flex flex-col gap-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <CakeCardSkeleton key={i} />)
        : cakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} onSelect={onSelect} />
          ))}
    </div>
  );
});

function Menu() {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(cakes.map((cake) => cake.category_name))],
    [cakes],
  );

  const handleCloseDetail = useCallback(() => setSelectedCake(null), []);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCakes();
        setCakes(data);
      } catch (err) {
        console.error("error fetching cakes", err);
        setError("Couldn't load the menu right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const filteredCakes = useMemo(
    () =>
      selectedCategory === "All"
        ? cakes
        : cakes.filter((cake) => cake.category_name === selectedCategory),
    [cakes, selectedCategory],
  );

  return (
    <Section id="menu" className="bg-cream">
      <div className="flex flex-col gap-4 md:gap-6 h-fit m-auto max-w-3xl py-8 md:py-12 rounded-lg">
        <p className="font-script text-brick text-2xl lg:text-3xl self-center">
          Make your Order
        </p>
        <h2 className="text-center">Our Menu Card</h2>

        {error && !loading ? (
          <p className="text-center text-brick text-sm py-10">{error}</p>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-col w-full">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
                loading={loading}
              />
              <CakeList
                cakes={filteredCakes}
                onSelect={setSelectedCake}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>

      {selectedCake && (
        <CakeDetail cake={selectedCake} onClose={handleCloseDetail} />
      )}
    </Section>
  );
}

export default Menu;
