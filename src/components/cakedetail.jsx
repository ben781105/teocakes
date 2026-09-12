import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState, memo } from "react";
import { useCart } from "../context/useCart";
import { formatPrice } from "../data/numberFormatter";

function CakeDetail({ cake, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!cake) return null;

  const { id, name, price, image, description } = cake;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addItem(id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error("error adding to cart", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed w-full  inset-0 z-50 flex items-center justify-center  py-6 px-6 md:px-8  bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-3xl w-full h-[90vh] md:h-110 flex flex-col md:flex-row overflow-hidden"
      >
        <button
          className="absolute z-10 top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#e5e5e5] shadow-emerald-100"
          onClick={onClose}
          aria-label="Close"
        >
          <X />
        </button>
        <div className=" z-1 w-full md:w-[45%] h-1/2 md:h-full shrink-0 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8  md:p-8 flex flex-col md:justify-center md:items-center  overflow-y-auto">
          <div className="flex flex-col gap-3">
            <h2>{name}</h2>
            <p>{description}</p>
            <p className="text-brick font-bold text-xl">
              Ugx&nbsp;{formatPrice(price ?? 0)}
            </p>

            <div className="flex items-center gap-4 mt-4 ">
              <div className="flex items-center gap-3 border rounded-full w-fit px-3 py-1">
                <button
                  className=" flex items-center justify-center w-8 h-8 rounded-full "
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-espresso" />
                </button>
                <span className="font-medium text-espresso">{quantity}</span>
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
                {" "}
                {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(CakeDetail);
