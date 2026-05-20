import React, { useState } from "react";
import { Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  originalPrice?: string;
  currentPrice: string;
  stockStatus: "In Stock" | "Out of Stock";
  addedDate: string;
}

const wishlistData: WishlistItem[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1686931463322-916e93213d86?w=600&auto=format&fit=crop&q=60",
    originalPrice: "$2500.00",
    currentPrice: "$3000.00",
    stockStatus: "In Stock",
    addedDate: "December 5, 2019",
  },
  {
    id: 2,
    name: "Classy shirt",
    image: "https://plus.unsplash.com/premium_photo-1673356302031-86c27e061153?w=600&auto=format&fit=crop&q=60",
    currentPrice: "$16.00",
    stockStatus: "In Stock",
    addedDate: "December 6, 2019",
  },
  {
    id: 3,
    name: "Beanie",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=100",
    originalPrice: "$20.00",
    currentPrice: "$18.00",
    stockStatus: "In Stock",
    addedDate: "December 6, 2019",
  },
];

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>(wishlistData);

  const removeItem = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-full mx-auto px-4 py-8 font-sans text-gray-700">
      {/* Breadcrumb */}
      <nav className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">
        WISHLIST
      </nav>

      {/* Header */}
      <header className="flex flex-col items-center mb-12">
        <Heart size={48} strokeWidth={1} className="text-gray-800 mb-2" />
        <h1 className="text-5xl font-bold text-gray-800">My Wishlist</h1>
      </header>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-12 border-b border-gray-200 pb-4 mb-4 px-2 font-bold text-gray-800">
        <div className="col-span-1"></div>
        <div className="col-span-4">Product name</div>
        <div className="col-span-2 text-center">Unit price</div>
        <div className="col-span-2 text-center">Stock status</div>
        <div className="col-span-3"></div>
      </div>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <p className="text-center text-gray-400 py-16 text-lg">
          Your wishlist is empty.
        </p>
      )}

      {/* Wishlist Items */}
      <div className="space-y-0">
        {wishlist.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/ProductDetail/${item.id}`)}
            className="grid grid-cols-1 md:grid-cols-12 items-center border-b border-gray-100 py-6 px-2 group cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
          >
            {/* Remove Icon */}
            <div className="col-span-1 flex justify-center md:justify-start mb-4 md:mb-0">
              <button
                onClick={(e) => removeItem(e, item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={25} strokeWidth={1.5} />
              </button>
            </div>

            {/* Product Image & Name */}
            <div className="col-span-4 flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-28 object-cover bg-gray-50 rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-gray-600 font-medium group-hover:text-indigo-600 transition-colors">
                {item.name}
              </span>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center py-2 md:py-0">
              {item.originalPrice && (
                <span className="text-gray-400 line-through mr-2">
                  {item.originalPrice}
                </span>
              )}
              <span className="text-yellow-600 font-medium">
                {item.currentPrice}
              </span>
            </div>

            {/* Stock */}
            <div className="col-span-2 text-center text-gray-500 py-2 md:py-0">
              {item.stockStatus}
            </div>

            {/* Action Area */}
            <div className="col-span-3 flex flex-col items-end gap-2">
              <span className="text-[10px] text-gray-400">
                Added on: {item.addedDate}
              </span>
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-[#7072a8] hover:bg-[#5e60a8] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;