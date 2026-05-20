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
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

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

const productDatabase: Record<string, ProductData> = {
  "1": {
    id: "1",
    title: "Nike Air Max 270",
    price: 3000,
    description:
      "The Nike Air Max 270 delivers an all-day comfortable ride with its large Air unit and foam midsole. Sleek design meets cushioned performance for everyday wear.",
    rating: 4.7,
    reviewCount: 218,
    images: [
      "https://images.unsplash.com/photo-1686931463322-916e93213d86?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=60",
    ],
    colors: [
      { name: "Midnight Black", class: "bg-gray-900" },
      { name: "Signal Red", class: "bg-red-600" },
      { name: "Pure White", class: "bg-gray-100 border border-gray-300" },
    ],
    sizes: ["7", "8", "9", "10", "11"],
    details: [
      { label: "Upper", value: "Mesh & synthetic overlays" },
      { label: "Midsole", value: "Max Air 270 unit + foam" },
      { label: "Sole", value: "Rubber waffle outsole" },
      { label: "Care", value: "Spot clean with damp cloth" },
    ],
  },
  "2": {
    id: "2",
    title: "Classy Shirt",
    price: 16,
    description:
      "A timeless classy shirt crafted from premium cotton blend. Perfect for formal occasions or smart-casual outings. Wrinkle-resistant and breathable.",
    rating: 4.4,
    reviewCount: 85,
    images: [
      "https://plus.unsplash.com/premium_photo-1673356302031-86c27e061153?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=60",
    ],
    colors: [
      { name: "Crisp White", class: "bg-white border border-gray-300" },
      { name: "Sky Blue", class: "bg-blue-400" },
      { name: "Charcoal", class: "bg-gray-700" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      { label: "Material", value: "60% Cotton, 40% Polyester" },
      { label: "Fit", value: "Regular / Slim available" },
      { label: "Collar", value: "Classic spread collar" },
      { label: "Care", value: "Machine wash 30°C" },
    ],
  },
  "3": {
    id: "3",
    title: "Beanie",
    price: 18,
    description:
      "Stay warm in style with this ultra-soft knit beanie. Ribbed construction provides a snug, comfortable fit for cold days. One size fits most.",
    rating: 4.6,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1510598155934-0f0f6039a0d5?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&auto=format&fit=crop&q=60",
    ],
    colors: [
      { name: "Camel Brown", class: "bg-yellow-700" },
      { name: "Navy", class: "bg-blue-900" },
      { name: "Heather Grey", class: "bg-gray-400" },
    ],
    sizes: ["One Size"],
    details: [
      { label: "Material", value: "100% Merino Wool" },
      { label: "Style", value: "Ribbed cuff beanie" },
      { label: "Fit", value: "One size fits most" },
      { label: "Care", value: "Hand wash cold, lay flat to dry" },
    ],
  },
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);
    setSelectedColor(0);
    setQuantity(1);
    setTimeout(() => {
      const data = productDatabase[id ?? ""];
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes[1] || data.sizes[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <button
          onClick={() => navigate("/Wishlist")}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Back to Wishlist
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans antialiased text-gray-900">
      {/* Back button */}
      <button
        onClick={() => navigate("/Wishlist")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Wishlist
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border-2 transition-all
                  ${
                    selectedImage === idx
                      ? "border-indigo-600 ring-2 ring-indigo-600/10"
                      : "border-transparent hover:border-gray-300"
                  }`}
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

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Wishlist Item
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
              {product.title}
            </h1>

            {/* Price & Rating */}
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

            {/* Colors */}
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
                    className={`w-8 h-8 rounded-full ${color.class} ring-offset-2 transition-all
                      ${selectedColor === idx ? "ring-2 ring-indigo-600 scale-110" : "hover:scale-105"}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
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
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
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

              {/* Add to Bag */}
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/15">
                <ShoppingBag size={20} />
                Add to Bag
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 border rounded-xl transition-all
                  ${
                    isWishlisted
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 py-4 bg-gray-50/50 rounded-xl text-[11px] text-gray-500 font-medium px-4 border border-gray-100">
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

            {/* Specs accordion */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="w-full px-5 py-4 bg-white flex items-center justify-between text-left font-bold text-sm text-gray-900 focus:outline-none"
              >
                <span>Product Details</span>
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
