import { useState, memo } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import Container from "./layout/container";
import TopBar from "./TopBar";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/useCart";
import { useWhatsappOrderLink } from "../data/whatsappOrderLink";

const navLinks = [
  { type: "route", to: "/", label: "Home", end: true },
  { type: "scroll", id: "about", label: "About" },
  { type: "route", to: "/custom-order", label: "Custom Order" },
  { type: "route", to: "/menu", label: "Menu" },
  { type: "route", to: "/gallery", label: "Gallery" },
];

function Navbar({ onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappOrderLink = useWhatsappOrderLink("256746326666");
  const { cart } = useCart();

  const itemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const desktopClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200  ${
      isActive
        ? "text-brick border-brick border-b-2 pb-1"
        : "text-espresso  hover:text-brick border-b-0 pb-0"
    }`;

  const mobileClass = (isActive) =>
    `text-base font-medium py-2 text-left transition-colors duration-200 ${
      isActive ? "text-brick" : "text-espresso hover:text-brick"
    }`;

  function NavItem({ link, variant }) {
    if (link.type === "scroll") {
      return (
        <button
          onClick={() => scrollToSection(link.id)}
          className={
            variant === "desktop"
              ? "text-sm font-medium text-espresso border-b-2 border-transparent hover:text-brick hover:border-brick transition-colors duration-200"
              : mobileClass(false)
          }
        >
          {link.label}
        </button>
      );
    }
    return (
      <NavLink
        to={link.to}
        end={link.end}
        onClick={() => setMobileOpen(false)}
        className={
          variant === "desktop"
            ? desktopClass
            : ({ isActive }) => mobileClass(isActive)
        }
      >
        {link.label}
      </NavLink>
    );
  }

  return (
    <div className="sticky top-0 z-50">
      <TopBar />

      <div className="bg-cream shadow-xl">
        <Container className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-2xl" aria-hidden="true">
              🎂
            </span>
            <span className="font-heading text-xl font-bold text-espresso">
              TeoCakes
            </span>
          </Link>

          {/* Desktop links — flex row, hidden below md */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} variant="desktop" />
            ))}
          </div>

          <div className="flex gap-5 items-center">
            <button
              onClick={onCartClick}
              aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative self-end w-11 h-11 rounded-full bg-cream-dark flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 w-4 h-4 text-[11px] bg-brick text-white rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href={whatsappOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center rounded-3xl justify-center gap-2 font-medium bg-brick text-cream hover:bg-brick-hover hover:-translate-y-0.5 shadow-md hover:shadow-xl duration-300 py-2.5 w-43  transition"
            >
              Order Online
            </a>

            <button
              className="md:hidden p-2 text-espresso cursor-pointer"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu — flex column, only rendered below md */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border-b border-gray-100 shadow-md"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavItem key={link.label} link={link} variant="mobile" />
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Navbar);
