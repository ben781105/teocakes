// src/components/Footer.jsx
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-announcement relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎂</span>
              <span className=" font-heading text-xl font-semibold text-white">
                TeoCakes
              </span>
            </div>
            <p className="leading-relaxed max-w-sm text-white/80">
              Handmade cakes crafted with fresh ingredients and a lot of heart
              made to order, just for you.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5 "
              >
                <FaFacebook className="w-5 h-5 text-white/80 " />
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="Follow us on instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaInstagram className="w-5 h-5 text-white/80" />
              </a>
              <a
                href="https://www.X.com"
                aria-label="Follow us on X"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaXTwitter className="w-5 h-5 text-white/80" />
              </a>
              <a
                href="https://www.youtube.com"
                aria-label="Follow us on Youtube"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-brick duration-300 transition hover:-translate-y-0.5"
              >
                <FaYoutube className="w-5 h-5 text-white/80" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between sm:flex-row gap-10 md:gap-20">
            <div>
              <h3 className="text-white font-semibold mb-4 ">Quick Links</h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Menu
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/custom-order"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Custom Order
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <a
                    href="#about"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    About
                  </a>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/gallery"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="block md:hidden">
              <h3 className="text-white font-semibold mb-4 ">Categories</h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Birthday Cakes
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Fruit Cakes
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Vanilla Cakes
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Wedding Cakes
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/`menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Chocolate Cakes
                  </Link>
                </li>
                <li className=" hover:translate-x-1 duration-300 transition-all">
                  <Link
                    to="/`menu"
                    className="text-white/80  hover:translate-x-1 hover:text-gold transition-all duration-300"
                  >
                    Custom Cakes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className=" text-sm text-white/80">
                    Entebbe, Uganda
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4  text-gold shrink-0" />
                  <span className="text-sm text-white/80">
                    +256 700 000 000
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  <span className=" text-sm text-white/80">
                    hello@bakeryname.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-6 text-xs text-gray-500 ">
          © {new Date().getFullYear()} TeoCakes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
