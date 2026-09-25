import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Layout from "./components/global/layout";
import CartProvider from "./context/cartProvider";
import CustomCakeForm from "./components/customCakeForm";
import Menu from "./components/menu";
import Gallery from "./components/gallery";
import CategoryPage from "./pages/categoryPage";
import CakeDetailPage from "./pages/cakedetailpage";
import { useParams } from "react-router-dom";
import NotFound from "./pages/notfound";
import ScrollToTopOnNavigate from "./components/global/scrollnavigate";

function KeyedCakeDetail() {
  const { cakeSlug } = useParams();
  return <CakeDetailPage key={cakeSlug} />;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTopOnNavigate />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/custom-order" element={<CustomCakeForm />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/:categorySlug" element={<CategoryPage />} />
            <Route
              path="/:categorySlug/:cakeSlug"
              element={<KeyedCakeDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
