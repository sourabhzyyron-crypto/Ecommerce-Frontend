import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./Pages/HeroSection";
import SlidingBanner from "./Pages/SlidingBanner";
import BestSellingSection from "./Pages/BestSellingSection";
import Footer from "./Pages/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProductPage from "./Pages/ProductPage";
import WishlistPage from "./Pages/Wishlist";
import Login from "./Pages/LoginPage";
import CartPage from "./Components/CartPage";
import SignUp from "./Pages/SignupPage";
import Dashboard from "./Components/AdminDashboard.tsx";
import ProductDetail from "./Components/ProductDetail.tsx";
import TrendingSection from "./Pages/TrendingSection";
import CategorySectionPage from "./Components/CategorySectionPage.tsx";

function HomePage() {
  return (
    <>
      <Header />
      <SlidingBanner />
      <HeroSection />

      <TrendingSection />
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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Category/:categoryName"
          element={<CategorySectionPage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
