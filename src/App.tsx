import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategorySection from "./Pages/CategorySection";
import HeroSection from "./Pages/HeroSection";
import SlidingBanner from "./Pages/SlidingBanner";
import BestSellingSection from "./Pages/BestSellingSection";
import Footer from "./Pages/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProductPage from "./Pages/ProductPage";
import WishlistPage from "./Pages/Wishlist";

function HomePage() {
  return (
    <>
      <Header />
      <SlidingBanner />
      <HeroSection />
      <CategorySection />
      <BestSellingSection />
      <Footer />
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/Category" element={<CategorySection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
