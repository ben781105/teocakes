// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from './layout/container'
import TopBar from './TopBar'
import { motion, AnimatePresence } from "motion/react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700 hover:text-gray-900'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `text-base font-medium py-2 ${isActive ? 'text-red-600' : 'text-gray-700'}`

  return (
    <div className="sticky top-0 z-50">
      <TopBar />

      <div className="bg-white border-b border-gray-100">
        <Container className="flex items-center justify-between py-4">

          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="text-2xl">🎂</span>
            <span className="text-xl font-serif font-bold text-gray-900">TeoCakes</span>
            <span className="text-red-600">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
              About
            </button>
            <NavLink to="/custom-order" className={linkClass}>Custom Order</NavLink>
            <NavLink to="/menu" className={linkClass}>Menu</NavLink>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
              How It Works
            </button>
          </div>

          <a
            href="https://wa.me/256700000000?text=Hi!%20I'd%20like%20to%20order%20a%20cake."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Order Online
            <span className="text-base">↗</span>
          </a>

          {/* Mobile toggle button */}
          <button
            className="md:hidden p-2 text-gray-700 cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </Container>
      </div>

      <AnimatePresence>
      {mobileOpen && (
        <motion.div className="md:hidden bg-white border-b border-gray-100 shadow-md"
        initial ={{y:-30, opacity:0}}
        animate={{y:0, opacity:1}}
        exit={{y: -30, opacity: 0}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        >
          <Container className="flex flex-col gap-1 py-4">
            <NavLink to="/" end className={mobileLinkClass} onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <button onClick={() => scrollToSection('about')} className="text-base font-medium text-gray-700 py-2 text-left">
              About
            </button>
            <NavLink to="/custom-order" className={mobileLinkClass} onClick={() => setMobileOpen(false)}>
              Custom Order
            </NavLink>
            <NavLink to="/menu" className={mobileLinkClass} onClick={() => setMobileOpen(false)}>
              Menu
            </NavLink>
            <button onClick={() => scrollToSection('how-it-works')} className="text-base font-medium text-gray-700 py-2 text-left">
              How It Works
            </button>

            <a
              href="https://wa.me/256700000000?text=Hi!%20I'd%20like%20to%20order%20a%20cake."
              target="_blank"
              rel="noopener noreferrer"
              className=" w-[40%] flex justify-center items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-4xl text-sm font-medium mt-3"
              onClick={() => setMobileOpen(false)}
            >
              Order Online
              <span className="text-base ">↗</span>
            </a>
          </Container>
        </motion.div>
      )}
        </AnimatePresence>
    </div>
  )
}

export default Navbar