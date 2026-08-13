import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Layout from './components/global/layout'
import CartProvider  from './context/cartProvider'
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App