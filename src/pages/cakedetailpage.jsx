import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Minus, Plus, Clock, Users } from "lucide-react";
import { getCakes } from "../services/cakeService";
import { useCart } from "../context/useCart";
import { formatPrice } from "../data/numberFormatter";
import Section from "../components/layout/section";
import CakeGridCard from "../components/cakegridcard";

function CakeDetailPage() {
  const { categorySlug, cakeSlug } = useParams();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    getCakes()
      .then(setCakes)
      .catch((err) => console.error("error fetching cake", err))
      .finally(() => setLoading(false));
  }, []);

  const cake = useMemo(
    () => cakes.find((c) => c.slug === cakeSlug),
    [cakes, cakeSlug],
  );

  const notFound = !loading && cakes.length > 0 && !cake;

  const relatedCakes = useMemo(() => {
    if (!cake) return [];
    return cakes
      .filter((c) => c.category_name === cake.category_name && c.id !== cake.id)
      .slice(0, 4);
  }, [cakes, cake]);

  const allImages = useMemo(() => {
    if (!cake) return [];
    return [
      { image: cake.image, thumbnail: cake.thumbnail },
      ...(cake.gallery_images || []),
    ];
  }, [cake]);

  const handleAddToCart = useCallback(async () => {
    console.log("message state:", message);
    if (!cake) return;
    console.log("DETAIL PAGE PASSING:", {
      message,
      flavourId: selectedFlavour,
    });
    setAdding(true);
    try {
      await addItem(cake.id, quantity, {
        message,
        flavourId: selectedFlavour,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error("error adding to cart", error);
    } finally {
      setAdding(false);
    }
  }, [cake, quantity, message, selectedFlavour, addItem]);

  if (notFound) {
    return <Navigate to={`/${categorySlug}`} replace />;
  }

  return (
    <>
      {cake && (
        <Helmet>
          <title>{cake.name} | TeoCakes</title>
          <meta
            name="description"
            content={`${cake.name} — ${cake.description?.slice(0, 140) || "Handmade in Kampala, baked fresh to order."}`}
          />
        </Helmet>
      )}
      <Section className="bg-cream">
        {loading ? (
          <div className="max-w-6xl  mx-auto animate-pulse">
            <div className="aspect-square rounded-2xl bg-cream-dark mb-6" />
            <div className="h-8 w-2/3 rounded bg-cream-dark mb-3" />
            <div className="h-4 w-full rounded bg-cream-dark" />
          </div>
        ) : cake ? (
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-sm text-brown mb-6">
              <Link to="/menu" className="hover:text-brick">
                Menu
              </Link>
              <span className="mx-2">/</span>
              <Link to={`/${categorySlug}`} className="hover:text-brick">
                {cake.category_name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-espresso">{cake.name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image gallery */}
              <div className="flex flex-col md:flex-row-reverse overflow-auto gap-3">
                <div className="aspect-square rounded-2xl overflow-hidden flex-1">
                  <img
                    src={allImages[activeImage]?.image}
                    alt={cake.name}
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-5 md:grid-cols-1 md:w-20 gap-2 shrink-0">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                          activeImage === i
                            ? "border-brick"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={img.thumbnail || img.image}
                          alt={`${cake.name} view ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl md:text-4xl font-medium text-espresso">
                  {cake.name}
                </h1>
                <p className="text-brown">{cake.description}</p>
                <p className="text-brick font-bold text-2xl">
                  Ugx&nbsp;{formatPrice(cake.price ?? 0)}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-brown border-y border-cream-dark py-4">
                  {cake.serving_size && (
                    <div className="flex items-center gap-2">
                      <Users
                        className="w-4 h-4 text-brick"
                        aria-hidden="true"
                      />
                      {cake.serving_size}
                    </div>
                  )}
                  {cake.prep_time && (
                    <div className="flex items-center gap-2">
                      <Clock
                        className="w-4 h-4 text-brick"
                        aria-hidden="true"
                      />
                      {cake.prep_time}
                    </div>
                  )}
                </div>

                {cake.flavours?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-espresso mb-2 block">
                      Choose a flavour
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {cake.flavours.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFlavour(f.id)}
                          className={`px-3 py-2 rounded-full border text-sm transition ${
                            selectedFlavour === f.id
                              ? "bg-brick border-brick text-white"
                              : "bg-white border-cream-dark hover:border-brick"
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="cake-message"
                    className="text-sm font-medium text-espresso mb-2 block"
                  >
                    Message on cake (optional)
                  </label>
                  <input
                    id="cake-message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={40}
                    placeholder="e.g. Happy Birthday Sarah!"
                    className="w-full border border-cream-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brick"
                  />
                </div>

                <p className="text-xs text-brown italic">
                  Every cake is freshly baked to order. Photos show recent
                  examples — your cake will be made specially for you.
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-3 border rounded-full w-fit px-3 py-1">
                    <button
                      className="flex items-center justify-center w-8 h-8 rounded-full"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-espresso" />
                    </button>
                    <span className="font-medium text-espresso">
                      {quantity}
                    </span>
                    <button
                      className="flex items-center justify-center w-8 h-8 rounded-full"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-espresso" />
                    </button>
                  </div>

                  <button
                    className="border px-3 rounded-3xl w-50 md:w-40 h-12 flex items-center justify-center font-medium bg-brick text-cream shadow-md hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-200"
                    onClick={handleAddToCart}
                  >
                    {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>

            {/* You may also like */}
            {relatedCakes.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-medium text-espresso mb-6">
                  You may also like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedCakes.map((c) => (
                    <CakeGridCard
                      key={c.id}
                      cake={c}
                      onSelect={() => navigate(`/${categorySlug}/${c.slug}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default CakeDetailPage;
