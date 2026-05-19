import React, { useState, useEffect } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
} from "lucide-react";

// --- TypeScript Interfaces ---
interface ProductDetailProps {
  productId: string;
}

interface ProductData {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; class: string }[];
  sizes: string[];
  details: { label: string; value: string }[];
}

// --- Mock Database Fetch Helper ---
const fetchProductMockData = (id: string): Promise<ProductData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: "Apex Horizon Waterproof Shell Jacket",
        price: 249.0,
        description:
          "Engineered for harsh environments. Features a triple-layer breathable membrane, fully taped seams, and an adjustable storm hood to keep you bone-dry without overheating during high-intensity alpine pursuits.",
        rating: 4.8,
        reviewCount: 124,
        images: [
          "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
        ],
        colors: [
          { name: "Obsidian Black", class: "bg-gray-900" },
          { name: "Alpine Blue", class: "bg-blue-600" },
          { name: "Forest Moss", class: "bg-emerald-800" },
        ],
        sizes: ["S", "M", "L", "XL"],
        details: [
          { label: "Material", value: "85% Recycled Nylon, 15% Elastane" },
          { label: "Waterproof Rating", value: "20,000mm hydrostatic head" },
          { label: "Weight", value: "420g (Size M)" },
          {
            label: "Care Instructions",
            value: "Machine wash cold, tumble dry low",
          },
        ],
      });
    }, 800); // Simulated network delay
  });
};

// --- Main Component ---
const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Interactive UI States
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchProductMockData(productId).then((data) => {
      setProduct(data);
      setSelectedSize(data.sizes[1]); // Default to Medium
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product)
    return <div className="text-center py-12">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans antialiased text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        {/* --- LEFT: Image Gallery --- */}
        <div className="flex flex-col gap-4">
          {/* Main Display Image */}
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm relative">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border-2 transition-all
                  ${selectedImage === idx ? "border-indigo-600 ring-2 ring-indigo-600/10" : "border-transparent hover:border-gray-300"}
                `}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT: Product Information Info --- */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title & Metadata */}
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              New Arrival
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
              {product.title}
            </h1>

            {/* Pricing & Ratings */}
            <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.floor(product.rating) ? "currentColor" : "none"
                      }
                      className={
                        i < Math.floor(product.rating) ? "" : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-sm text-gray-500 underline cursor-pointer hover:text-indigo-600">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="mt-8">
              <span className="text-sm font-bold text-gray-900 tracking-wide block">
                Color:{" "}
                <span className="font-normal text-gray-500">
                  {product.colors[selectedColor].name}
                </span>
              </span>
              <div className="flex items-center gap-3 mt-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full ${color.class} border ring-offset-2 transition-all
                      ${selectedColor === idx ? "ring-2 ring-indigo-600 scale-110" : "border-gray-200 hover:scale-105"}
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                <span className="tracking-wide">Size</span>
                <button className="text-indigo-600 hover:underline font-medium text-xs">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-semibold border text-sm transition-all text-center
                      ${
                        selectedSize === size
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Changer */}
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-gray-500 hover:bg-white hover:text-gray-900 rounded-lg transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-gray-500 hover:bg-white hover:text-gray-900 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/15">
                <ShoppingBag size={20} />
                Add to Bag
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 border rounded-xl transition-all
                  ${
                    isWishlisted
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                  }`}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 bg-gray-50/50 rounded-xl text-[11px] text-gray-500 font-medium px-4 border border-gray-100 mt-4">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-indigo-600" /> Free Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={14} className="text-indigo-600" /> 30-Day
                Returns
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-indigo-600" /> Lifetime
                Warranty
              </span>
            </div>

            {/* Collapsible Product Details Accordion */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mt-2">
              <button
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="w-full px-5 py-4 bg-white flex items-center justify-between text-left font-bold text-sm text-gray-900 focus:outline-none"
              >
                <span>Technical Specifications</span>
                {isSpecsOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {isSpecsOpen && (
                <div className="bg-gray-50/70 border-t border-gray-100 px-5 py-4 space-y-2 text-sm">
                  {product.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-500 font-medium">
                        {detail.label}
                      </span>
                      <span className="text-gray-900 font-semibold text-right">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
