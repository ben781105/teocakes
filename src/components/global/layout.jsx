import Footer from "../footer";
import Navbar from "../navbar";
import Cart from "../cart";
import WhatsappFloatButton from "../global/whatsappButton";
import ScrollToTopButton from "../global/scrolltopbutton";
import { useState, useCallback } from "react";
function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpen = useCallback(() => setCartOpen(true), []);
  const handleCartClose = useCallback(() => setCartOpen(false), []);

  return (
    <>
      <Navbar onCartClick={handleCartOpen} />
      <Cart isOpen={cartOpen} onClose={handleCartClose} />
      {children}
      <Footer />
      <WhatsappFloatButton />
      <ScrollToTopButton />
    </>
  );
}

export default Layout;
