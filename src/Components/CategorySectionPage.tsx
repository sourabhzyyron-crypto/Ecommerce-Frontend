import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Footer from "../Pages/Footer";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  tag?: string;
}

const categoryData: Record<
  string,
  {
    title: string;
    subtitle: string;
    banner: string;
    badgeColor: string;
    badgeText: string;
    products: Product[];
  }
> = {
  "women-dress": {
    title: "Women's Dress",
    subtitle: "Quick, easy, and effortless shopping.",
    banner:
      "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=1200&auto=format&fit=crop&q=60",
    badgeColor: "bg-pink-100 text-pink-600",
    badgeText: "Enjoy 20% savings",
    products: [
      {
        id: 1,
        name: "Floral Summer Dress",
        price: "$49.99",
        originalPrice: "$79.99",
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 2,
        name: "Evening Gown",
        price: "$120.00",
        image:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 3,
        name: "Casual Wrap Dress",
        price: "$39.99",
        originalPrice: "$55.00",
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 4,
        name: "Boho Maxi Dress",
        price: "$65.00",
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
      {
        id: 5,
        name: "Office Pencil Dress",
        price: "$58.00",
        originalPrice: "$75.00",
        image:
          "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 6,
        name: "Linen Shirt Dress",
        price: "$44.99",
        image:
          "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 7,
        name: "Satin Slip Dress",
        price: "$72.00",
        originalPrice: "$95.00",
        image:
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 8,
        name: "Knit Sweater Dress",
        price: "$55.00",
        image:
          "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 9,
        name: "Printed Midi Dress",
        price: "$42.99",
        originalPrice: "$60.00",
        image:
          "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
    ],
  },

  "men-collections": {
    title: "Men's Daily Store",
    subtitle: "Essentials, deals, and more.",
    banner:
      "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=1200&auto=format&fit=crop&q=60",
    badgeColor: "bg-yellow-100 text-yellow-700",
    badgeText: "Enjoy 20% savings",
    products: [
      {
        id: 1,
        name: "Classic White Shirt",
        price: "$29.99",
        originalPrice: "$45.00",
        image:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 2,
        name: "Slim Fit Chinos",
        price: "$49.99",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 3,
        name: "Casual Polo",
        price: "$24.99",
        originalPrice: "$35.00",
        image:
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 4,
        name: "Denim Jacket",
        price: "$89.00",
        image:
          "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
      {
        id: 5,
        name: "Formal Blazer",
        price: "$110.00",
        originalPrice: "$140.00",
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 6,
        name: "Graphic Tee",
        price: "$19.99",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 7,
        name: "Linen Trousers",
        price: "$54.99",
        originalPrice: "$70.00",
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 8,
        name: "Bomber Jacket",
        price: "$95.00",
        image:
          "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 9,
        name: "Striped Shirt",
        price: "$32.00",
        originalPrice: "$48.00",
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
    ],
  },

  "kids-collections": {
    title: "Kid's Collections",
    subtitle: "All your favorites, in one click.",
    banner:
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=1200&auto=format&fit=crop&q=60",
    badgeColor: "bg-teal-100 text-teal-600",
    badgeText: "Enjoy 20% savings",
    products: [
      {
        id: 1,
        name: "Cute Dungaree",
        price: "$22.99",
        originalPrice: "$35.00",
        image:
          "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 2,
        name: "Cartoon Print Tee",
        price: "$14.99",
        image:
          "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 3,
        name: "Kids Hoodie",
        price: "$32.00",
        originalPrice: "$42.00",
        image:
          "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 4,
        name: "Floral Skirt Set",
        price: "$27.99",
        image:
          "https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
      {
        id: 5,
        name: "Denim Shorts",
        price: "$18.99",
        originalPrice: "$28.00",
        image:
          "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 6,
        name: "Winter Puffer Jacket",
        price: "$54.99",
        image:
          "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&auto=format&fit=crop&q=60",
        tag: "New",
      },
      {
        id: 7,
        name: "Striped Jumpsuit",
        price: "$29.99",
        originalPrice: "$40.00",
        image:
          "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=400&auto=format&fit=crop&q=60",
        tag: "Sale",
      },
      {
        id: 8,
        name: "Knit Cardigan",
        price: "$34.99",
        image:
          "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?w=400&auto=format&fit=crop&q=60",
      },
      {
        id: 9,
        name: "Printed Leggings Set",
        price: "$21.99",
        originalPrice: "$30.00",
        image:
          "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&auto=format&fit=crop&q=60",
        tag: "Trending",
      },
    ],
  },
};

const tagColors: Record<string, string> = {
  Sale: "bg-rose-500",
  New: "bg-indigo-500",
  Trending: "bg-amber-500",
};

const sortOptions = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

const CategorySectionPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const category = categoryData[categoryName ?? ""];

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("Default");
  const [activeTag, setActiveTag] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Category not found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  };

  // Filter by tag
  const tags = ["All", "Sale", "New", "Trending"];
  let filtered =
    activeTag === "All"
      ? category.products
      : category.products.filter((p) => p.tag === activeTag);

  // Sort
  if (sortBy === "Price: Low to High") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", "")),
    );
  } else if (sortBy === "Price: High to Low") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", "")),
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src={category.banner}
          alt={category.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white text-center px-4">
          <span
            className={`text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 ${category.badgeColor}`}
          >
            {category.badgeText}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">
            {category.title}
          </h1>
          <p className="text-white/75 text-sm md:text-base">
            {category.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back + Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#7072a8] transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button>

          <div className="flex items-center gap-3">
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-600 hover:border-[#7072a8] transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filter
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-[#7072a8] cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tag filters */}
        {showFilter && (
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Filter by:
            </span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                  ${
                    activeTag === tag
                      ? "bg-[#7072a8] text-white border-[#7072a8]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#7072a8]"
                  }`}
              >
                {tag}
              </button>
            ))}
            {activeTag !== "All" && (
              <button
                onClick={() => setActiveTag("All")}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-600"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        )}

        {/* Product count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing{" "}
          <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
          products
        </p>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No products found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Tag badge */}
                {product.tag && (
                  <span
                    className={`absolute top-3 left-3 z-10 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${tagColors[product.tag] ?? "bg-gray-400"}`}
                  >
                    {product.tag}
                  </span>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                >
                  <Heart
                    size={16}
                    fill={wishlist.includes(product.id) ? "#f43f5e" : "none"}
                    className={
                      wishlist.includes(product.id)
                        ? "text-rose-500"
                        : "text-gray-400"
                    }
                  />
                </button>

                {/* Image */}
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-gray-800 font-semibold text-sm mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-[#7072a8] font-bold text-sm">
                      {product.price}
                    </span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-[#313447] hover:bg-[#7072a8] text-white py-2.5 rounded-xl text-xs font-semibold transition-colors duration-300">
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategorySectionPage;
