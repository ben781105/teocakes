import { getCategories } from "../services/categoryService";
import { useEffect, useState } from "react";
import Section from "./layout/section";
import { Link } from "react-router-dom";
function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Section id="categories" className="bg-cream">
      <div className="flex flex-col">
        <p className=" font-script text-brick text-2xl  lg:text-3xl self-center">
          What's Baking
        </p>
        <h2 className="text-center mt-2">
          Browse <span className="font-heading text-brick">Cake</span>{" "}
          Categories
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square  rounded-xl bg-cream-dark animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-10">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/${category.slug}`}
                className="group  bg-white flex flex-col items-center justify-center aspect-square md:aspect-auto border border-cream-dark  gap-2 py-10 md:py-12 rounded-2xl hover:bg-announcement hover:border-announcement hover:shadow-[0_12px_30px_rgba(75,45,35,0.12)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 md:w-18 md:h-18 rounded-full">
                  <img
                    src={category.thumbnail || category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full rounded-full object-cover
        border-3 border-transparent
        group-hover:border-gold
        group-hover:scale-105
        transition-all duration-300"
                  />
                </div>

                <h3
                  className="font-heading font-medium text-center px-2
      group-hover:text-white transition-colors duration-300"
                >
                  {category.name}
                </h3>

                <p className="text-sm group-hover:text-white transition-colors duration-300">
                  {category.product_count} item
                  {category.product_count === 1 ? "" : "s"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
export default CategorySection;
