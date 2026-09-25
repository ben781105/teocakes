// src/components/Footer.jsx
import { MapPin, Phone, Mail } from "lucide-react";
import { getCategories } from "../services/categoryService";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <footer className="bg-announcement relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 ">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">
                🎂
              </span>
              <span className="font-heading text-xl font-semibold text-white">
                TeoCakes
              </span>
            </div>
            <p className=" text-sm leading-relaxed max-w-lg text-white/80">
              Fresh, handmade cakes in Entebbe, crafted to order with quality
              ingredients for birthdays, weddings, and every special occasion.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaFacebook
                  className="w-5 h-5 text-white/80"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaInstagram
                  className="w-5 h-5 text-white/80"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.x.com"
                aria-label="Follow us on X"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaXTwitter
                  className="w-5 h-5 text-white/80"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.youtube.com"
                aria-label="Follow us on Youtube"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaYoutube
                  className="w-5 h-5 text-white/80"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="hover:translate-x-1 duration-300 transition-all">
                <Link
                  to="/"
                  className="text-white/80 hover:text-gold transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li className="hover:translate-x-1 duration-300 transition-all">
                <Link
                  to="/menu"
                  className="text-white/80 hover:text-gold transition-all duration-300"
                >
                  Menu
                </Link>
              </li>
              <li className="hover:translate-x-1 duration-300 transition-all">
                <Link
                  to="/custom-order"
                  className="text-white/80 hover:text-gold transition-all duration-300"
                >
                  Custom Order
                </Link>
              </li>
              <li className="hover:translate-x-1 duration-300 transition-all">
                <a
                  href="#about"
                  className="text-white/80 hover:text-gold transition-all duration-300"
                >
                  About
                </a>
              </li>
              <li className="hover:translate-x-1 duration-300 transition-all">
                <Link
                  to="/gallery"
                  className="text-white/80 hover:text-gold transition-all duration-300"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories — now its own column, shown at every screen size */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="hover:translate-x-1 duration-300 transition-all"
                >
                  <Link
                    to={`/${category.slug}`}
                    className="text-white/80 hover:text-gold transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 text-gold mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/80">Entebbe, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 text-gold shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/80">+256 700 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" aria-hidden="true" />
                <span className="text-sm text-white/80">
                  hello@bakeryname.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} TeoCakes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
