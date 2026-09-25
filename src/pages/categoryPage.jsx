import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getCakes } from "../services/cakeService";
import { getCategories } from "../services/categoryService";
import Section from "../components/layout/section";
import CakeCardSkeleton from "../components/skeletons/cakeCardSkeleton";
import CakeGridCard from "../components/cakegridcard";
import PriceFilterPills from "../components/pricefilterpills";
import { useNavigate } from "react-router-dom";
import NotFound from "./notfound";

function CategoryPage() {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cakesData, categoriesData] = await Promise.all([
          getCakes(),
          getCategories(),
        ]);
        setCakes(cakesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("error fetching category page data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const category = useMemo(
    () => categories.find((cat) => cat.slug === categorySlug),
    [categories, categorySlug],
  );

  const notFound = !loading && categories.length > 0 && !category;

  const categoryCakes = useMemo(
    () =>
      category
        ? cakes.filter((cake) => cake.category_name === category.name)
        : [],
    [cakes, category],
  );

  const filteredCakes = useMemo(() => {
    let result = categoryCakes;
    if (priceRange.min)
      result = result.filter((c) => parseFloat(c.price) >= priceRange.min);
    if (priceRange.max)
      result = result.filter((c) => parseFloat(c.price) <= priceRange.max);
    return result;
  }, [categoryCakes, priceRange]);

  if (notFound) {
    return <NotFound />;
  }

  const handleSelectedCake = (cake) => {
    navigate(`/${cake.category_slug}/${cake.slug}`);
  };

  return (
    <>
      {category && (
        <Helmet>
          <title>{category.name} in Kampala | TeoCakes</title>
          <meta
            name="description"
            content={
              category.description ||
              `Handmade ${category.name.toLowerCase()}, baked fresh and made to order in Kampala. Order on WhatsApp today.`
            }
          />
        </Helmet>
      )}

      <section className="bg-espresso py-10 ">
        <div className="w-full max-w-6xl px-6 md:px-8 mx-auto  overflow-hidden">
          {loading ? (
            <div className="h-8 w-48 rounded bg-espresso animate-pulse" />
          ) : (
            <>
              <p className="font-script text-brick text-2xl  lg:text-3xl ">
                Cake Category
              </p>
              <h2 className="text-cream  font-medium mb-3">{category?.name}</h2>
              <p className=" text-white max-w-xl">
                {category?.description ||
                  "Filter this category by price and open any cake to place your order."}
              </p>
            </>
          )}
        </div>
      </section>

      <Section id={categorySlug} className="bg-cream">
        <PriceFilterPills priceRange={priceRange} onSelect={setPriceRange} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CakeCardSkeleton key={i} />
              ))
            : filteredCakes.map((cake) => (
                <CakeGridCard
                  key={cake.id}
                  cake={cake}
                  onSelect={handleSelectedCake}
                />
              ))}
        </div>

        {!loading && filteredCakes.length === 0 && (
          <p className="text-center text-brown text-sm mt-6">
            No cakes in this price category yet.
          </p>
        )}
      </Section>
    </>
  );
}

export default CategoryPage;
