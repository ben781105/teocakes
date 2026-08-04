// src/components/layout/Layout.jsx
import Footer from '../footer'
import Navbar from '../navbar'
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout