// src/components/Footer.jsx
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter,FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-40">

        
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎂</span>
              <span className="text-xl font-semibold text-white">TeoCakes</span>
              <span className="text-orange-500">.</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Handmade cakes crafted with fresh ingredients and a lot of heart —
              made to order, just for you.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                <FaFacebook className="w-3 h-3"/>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                <FaInstagram className="w-3 h-3"/>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                 <FaTwitter className="w-3 h-3"/>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                 <FaYoutube className="w-3 h-3"/>
              </a>
            </div>
          </div>

         
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-40">

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/menu" className="hover:text-white transition">Menu</Link></li>
                <li><Link to="/custom-order" className="hover:text-white transition">Custom Order</Link></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>Kampala, Uganda</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>+256 700 000 000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>hello@bakeryname.com</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

       
        <div className="border-t border-gray-800 mt-12 pt-6 text-xs text-gray-500 ">
          © {new Date().getFullYear()} TeoCakes. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer