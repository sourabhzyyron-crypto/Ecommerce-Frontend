import React from "react";
import {
  MapPin,
  Phone,
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Heart,
  Menu,
} from "lucide-react";


const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 font-sans">
      {/* TOP BAR */}
      <div className="bg-[#7072a8] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between text-sm">
          {/* LEFT */}
          <div className="hidden md:flex items-center gap-2 text-white/90">
            <MapPin size={14} />
            <span>Ranchi, India</span>
          </div>

          {/* CENTER */}
          <div className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide">
            {["About", "Support", "Wishlist", "Track Order"].map(
              (item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white transition-all duration-300 hover:opacity-100 opacity-80"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 text-white/90">
            <Phone size={14} />
            <span>+91 9876543210</span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="backdrop-blur-2xl bg-white/70 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">


          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-10">
            {["Home", "About", "Category", "Products", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="group relative flex items-center gap-1 text-[15px] font-semibold text-gray-700 hover:text-[#7072a8] transition-all duration-300"
                >
                  {item}

                  <ChevronDown
                    size={15}
                    className="opacity-60 group-hover:rotate-180 transition-all duration-300"
                  />

                  {/* ANIMATED UNDERLINE */}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#7072a8] rounded-full transition-all duration-300 group-hover:w-full"></span>
                </a>
              ),
            )}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 justify-end">
            {/* SEARCH */}
            <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-[#7072a8]/10 text-[#7072a8] hover:bg-[#7072a8] hover:text-white transition-all duration-300 hover:scale-110 shadow-md">
              <Search size={20} />
            </button>

            {/* WISHLIST */}
            <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-[#7072a8]/10 text-[#7072a8] hover:bg-[#7072a8] hover:text-white transition-all duration-300 hover:scale-110 relative shadow-md">
              <Heart size={20} />

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#fa0606] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                2
              </span>
            </button>

            {/* ACCOUNT */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 border border-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-[#7072a8]/10 flex items-center justify-center text-[#7072a8]">
                <User size={18} />
              </div>

              <div className="leading-tight">
                <p className="text-xs text-gray-500">
                  Welcome Back
                </p>

                <p className="text-sm font-bold text-gray-900">
                  Login / Signup
                </p>
              </div>
            </div>

            {/* CART */}
            <button className="relative flex items-center gap-3 bg-[#7072a8] text-white px-5 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl shadow-[#7072a8]/30">
              <div className="relative">
                <ShoppingCart size={22} />

                {/* BADGE */}
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  3
                </span>
              </div>

              <div className="hidden md:block text-left leading-tight">
                <p className="text-[11px] text-white/70">
                  Your Cart
                </p>

                <p className="text-sm font-bold">$249</p>
              </div>
            </button>

            {/* MOBILE MENU */}
            <button className="lg:hidden w-12 h-12 rounded-2xl bg-[#7072a8]/10 text-[#7072a8] flex items-center justify-center">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;