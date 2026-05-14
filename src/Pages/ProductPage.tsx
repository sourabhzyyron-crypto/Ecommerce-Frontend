import React, { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const ProductPage: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  ];

  const sizes = ["S", "M", "L", "XL"];

  const colors = [
    "#000000",
    "#7072a8",
    "#d6cfc7",
    "#ffffff",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[1]);

  return (
    <div className="min-h-screen bg-[#f7f7fb] py-20 px-6 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT IMAGES */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* THUMBNAILS */}
            <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === img
                      ? "border-[#7072a8] scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex-1 group order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#7072a8]/10 blur-3xl rounded-[40px]"></div>

              <div className="relative overflow-hidden rounded-[40px] bg-white shadow-2xl">
                <img
                  src={selectedImage}
                  alt="product"
                  className="w-full h-[650px] object-cover group-hover:scale-105 transition-all duration-700"
                />

                {/* SALE BADGE */}
                <div className="absolute top-6 left-6 bg-[#7072a8] text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                  New Arrival
                </div>

                {/* WISHLIST */}
                <button className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-xl hover:bg-[#7072a8] hover:text-white transition-all duration-300">
                  <Heart size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* CATEGORY */}
            <span className="inline-block px-5 py-2 rounded-full bg-[#7072a8]/10 text-[#7072a8] font-semibold tracking-wide text-sm uppercase">
              Premium Collection
            </span>

            {/* PRODUCT TITLE */}
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mt-6">
              Oversized
              <span className="text-[#7072a8] block">
                Essential Hoodie
              </span>
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="text-gray-500">
                (128 Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-8">
              <h2 className="text-4xl font-black text-[#7072a8]">
                ₹2,499
              </h2>

              <span className="text-2xl text-gray-400 line-through">
                ₹3,999
              </span>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-bold">
                38% OFF
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-8 text-gray-500 leading-relaxed text-lg">
              Crafted with premium heavyweight cotton for a
              relaxed oversized fit. Designed to deliver timeless
              streetwear aesthetics with unmatched comfort and
              versatility.
            </p>

            {/* SIZE SELECTOR */}
            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">
                Select Size
              </h3>

              <div className="flex gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-2xl font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-[#7072a8] text-white shadow-xl shadow-[#7072a8]/30"
                        : "bg-white border border-gray-200 hover:border-[#7072a8]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR SELECTOR */}
            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">
                Select Color
              </h3>

              <div className="flex gap-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                      selectedColor === color
                        ? "border-[#7072a8] scale-110"
                        : "border-white"
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mt-12">
              <button className="flex-1 bg-[#7072a8] hover:bg-[#5f618f] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-[#7072a8]/30 hover:scale-[1.02]">
                <ShoppingBag size={22} />
                Add To Cart
              </button>

              <button className="flex-1 bg-white border border-gray-200 hover:border-[#7072a8] py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl">
                Buy Now
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">
              {[
                {
                  icon: <Truck size={22} />,
                  title: "Free Shipping",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Secure Payment",
                },
                {
                  icon: <RotateCcw size={22} />,
                  title: "Easy Returns",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#7072a8]/10 text-[#7072a8] flex items-center justify-center mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#7072a8] uppercase tracking-[4px] text-sm font-bold">
                You May Also Like
              </span>

              <h2 className="text-5xl font-black mt-3">
                Related Products
              </h2>
            </div>

            <button className="hidden md:block px-8 py-4 rounded-2xl bg-[#7072a8] text-white font-bold shadow-xl hover:scale-105 transition-all duration-300">
              View All
            </button>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                    alt="product"
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <button className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-lg hover:bg-[#7072a8] hover:text-white transition-all duration-300">
                    <Heart size={18} />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-sm text-[#7072a8] font-semibold uppercase tracking-wide">
                    Essentials
                  </p>

                  <h3 className="text-2xl font-black mt-2">
                    Modern Hoodie
                  </h3>

                  <div className="flex items-center justify-between mt-6">
                    <h4 className="text-2xl font-black text-[#7072a8]">
                      ₹1,999
                    </h4>

                    <button className="w-12 h-12 rounded-2xl bg-[#7072a8] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;