import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Container from "./layout/container";

function TopBar() {
  return (
    <div className="hidden md:block  text-gray-300 text-xs bg-announcement">
      <Container className=" flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <a
            href="tel:+256700000000"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            +256 700 000 000
          </a>
          <a
            href="mailto:hello@bakeryname.com"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Mail className="w-3.5 h-3.5 text-gold" />
            hello@bakeryname.com
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            Entebbe, Uganda
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://www.tiktok.com"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-gold duration-300 transition hover:-translate-y-0.5"
            >
              <FaTiktok className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.facebook.com"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-gold duration-300 transition hover:-translate-y-0.5"
            >
              <FaFacebook className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.instagram.com"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-gold duration-300 transition hover:-translate-y-0.5"
            >
              <FaInstagram className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.X.com"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-gold duration-300 transition hover:-translate-y-0.5"
            >
              <FaXTwitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TopBar;
