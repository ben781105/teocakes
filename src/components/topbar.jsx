import { Phone, Mail, MapPin} from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'
import Container from './layout/container'

function TopBar() {
  return (
    <div className="hidden md:block bg-gray-900 text-gray-300 text-xs">
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <a href="tel:+256700000000" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            +256 700 000 000
          </a>
          <a href="mailto:hello@bakeryname.com" className="flex items-center gap-1.5 hover:text-white transition">
            <Mail className="w-3.5 h-3.5 text-orange-500" />
            hello@bakeryname.com
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            Kampala, Uganda
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Taking orders: 9AM - 6PM
          </span>
          <div className="flex items-center gap-2">
            <a href="#" className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
              <FaFacebook className="w-3 h-3" />
            </a>
            <a href="#" className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
              <FaInstagram className="w-3 h-3" />
            </a>
            <a href="#" className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
              <FaTwitter className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TopBar