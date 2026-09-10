import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Layout from "./components/global/layout";
import CartProvider from "./context/cartProvider";
import CustomCakeForm from "./components/customCakeForm";
import Menu from "./components/menu";
import Gallery from "./components/gallery";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/custom-order" element={<CustomCakeForm />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
