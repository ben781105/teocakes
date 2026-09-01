import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { getCakes } from "../services/productService";
import Section from "./layout/section";
import menuImage from "../assets/stockcake.jpg";
import CakeDetail from "./cakedetail";
import { formatPrice } from "../data/numberFormatter";

const CategoryPills = memo(function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`text-xs px-3 py-1 rounded-full border transition
            ${
              selectedCategory === category
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-600 hover:border-gray-400"
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
      className="flex items-center gap-4 border border-gray-200 rounded-xl cursor-pointer px-3 py-3"
    >
      <img
        src={image}
        alt={name}
        className="w-14 h-14 object-cover rounded-lg shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">
          Ugx&nbsp;{formatPrice(price ?? 0)}
        </p>
      </div>
    </div>
  );
});

const CakeList = memo(function CakeList({ cakes, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {cakes.map((cake) => (
        <CakeCard key={cake.id} cake={cake} onSelect={onSelect} />
      ))}
    </div>
  );
});

function Menu() {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(cakes.map((cake) => cake.category_name))],
    [cakes],
  );

  const handleCloseDetail = useCallback(() => setSelectedCake(null), []);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakes();
        setCakes(data);
      } catch (error) {
        console.error("error fetching cakes", error);
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
    <Section id="menu">
      <div className="flex flex-col gap-4 md:gap-6 h-fit">
        <p className=" font-script self-center">Make your Order</p>
        <h2 className="text-center">Our Menu Card</h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex flex-col w-full md:w-[60%]">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <CakeList cakes={filteredCakes} onSelect={setSelectedCake} />
          </div>

          <div className="flex-1 flex-start">
            <img
              src={menuImage}
              alt=""
              className="object-cover w-full h-80 md:h-full rounded-2xl"
            />
          </div>
        </div>
      </div>

      {selectedCake && (
        <CakeDetail cake={selectedCake} onClose={handleCloseDetail} />
      )}
    </Section>
  );
}

export default Menu;
