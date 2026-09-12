import { useState, useEffect } from "react";
import Section from "./layout/section";
import { getCakes } from "../services/cakeService";
import PillSkeleton from "./skeletons/pillSkeleton";
import GallerySkeleton from "./skeletons/gallerySkeleton";

function Gallery() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCake, setSelectedCake] = useState(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakes();
        setCakes(data);
      } catch (err) {
        console.error("Error fetching cakes:", err);
        setError("Couldn't load the gallery right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const categories = [
    "All",
    ...new Set(cakes.map((c) => c.category_name).filter(Boolean)),
  ];

  const visibleCakes =
    activeCategory === "All"
      ? cakes
      : cakes.filter((c) => c.category_name === activeCategory);

  useEffect(() => {
    if (!selectedCake) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedCake(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedCake]);

  return (
    <Section className="bg-cream" id="gallery">
      <p className="text-center font-script text-2xl lg:text-3xl text-brick mb-4">
        See What We've Baked
      </p>
      <h2 className="font-semibold text-center mb-2">Our Gallery</h2>
      <p className="text-center max-w-md mx-auto mb-6">
        A few favorites from past orders. See something you like? Tap it to
        order one just like it.
      </p>

      {/* Category tabs */}
      {loading ? (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["w-14", "w-20", "w-24", "w-16", "w-28", "w-32", "w-30"].map(
            (w, i) => (
              <PillSkeleton key={i} width={w} />
            ),
          )}
        </div>
      ) : (
        !error &&
        cakes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-full text-sm border transition-colors duration-300 ${
                  activeCategory === cat
                    ? "bg-brick border-brick text-white"
                    : "bg-white border-cream-dark hover:border-brick hover:bg-brick hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )
      )}

      {/* Grid */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <GallerySkeleton key={i} />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="text-center text-brick text-sm py-10">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {visibleCakes.map((cake) => (
            <button
              key={cake.id}
              onClick={() => setSelectedCake(cake)}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <span className="text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {cake.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && !error && visibleCakes.length === 0 && (
        <p className="text-center text-brown text-sm mt-6">
          No cakes in this category yet.
        </p>
      )}

      {/* Lightbox */}
      {selectedCake && (
        <div
          onClick={() => setSelectedCake(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-md lg:max-w-xl w-full relative"
          >
            <img
              src={selectedCake.image}
              alt={selectedCake.name}
              className="w-full max-h-80 object-cover"
            />
            <div className="p-5 bg-white flex flex-col gap-3">
              <h3 className="font-semibold">{selectedCake.name}</h3>
              <p>{selectedCake.description}</p>
            </div>
            <button
              onClick={() => setSelectedCake(null)}
              aria-label="Close"
              className="absolute top-3 right-3 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-espresso"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

export default Gallery;
