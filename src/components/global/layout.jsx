// src/components/layout/Layout.jsx
import Footer from '../footer'
import Navbar from '../navbar'
import Cart from '../cart'
import { useState } from 'react'
function Layout({ children }) {
  const [cartOpen,setCartOpen] = useState(false)
  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      {cartOpen && <Cart  isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
      {children}
      <Footer />
    </>
  )
}

export default Layout