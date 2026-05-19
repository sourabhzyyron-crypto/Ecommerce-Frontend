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
import Login from "./Pages/LoginPage";
import CartPage from "./Components/CartPage";
import SignUp from "./Pages/SignupPage";
import Dashboard from "./Components/AdminDashboard.tsx";


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
        <Route path="/" element={<HomePage />} />
        <Route path="/Category" element={<CategorySection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
