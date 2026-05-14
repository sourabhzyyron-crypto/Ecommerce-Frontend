import React from "react";
import { ArrowUpRight } from "lucide-react";

interface CategoryProps {
  title: string;
  subtitle: string;
  discountText: string;
  image: string;
  buttonText: string;
  badgeColor: string;
}

const CategoryCard: React.FC<CategoryProps> = ({
  title,
  subtitle,
  discountText,
  image,
  buttonText,
  badgeColor,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#f3f6ff] h-[550px] w-full">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle Overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-[2rem] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          {/* Discount Badge */}
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.1em] mb-4 shadow-sm ${badgeColor}`}
          >
             {discountText}
          </span>

          {/* Title & Subtitle */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
            {title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {subtitle}
          </p>

          {/* Action Button */}
          <button className="group flex items-center gap-2 bg-[#313447] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-[#7072a8]">
            {buttonText}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const CategorySection: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      title: "Women's Dress",
      subtitle: "Quick, easy, and effortless shopping.",
      discountText: "Enjoy 20% savings",
      image: "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=600&auto=format&fit=crop&q=60",
      buttonText: "Explore Now",
      badgeColor: "bg-pink-50 text-pink-600",
    },
    {
      title: "Men's Daily Store",
      subtitle: "Essentials, deals, and more.",
      discountText: "Enjoy 20% savings",
      image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=600&auto=format&fit=crop&q=60",
      buttonText: "Shop Now",
      badgeColor: "bg-yellow-50 text-yellow-700",
    },
    {
      title: "Kid's Collections",
      subtitle: "All your favorites, in one click.",
      discountText: "Enjoy 20% savings",
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=60",
      buttonText: "Explore Now",
      badgeColor: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      
      {/* --- ATTRACTIVE CATEGORY HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-center gap-6 mb-16">
        <div className="max-w-2xl ">
          <div className="flex items-center gap-3 mb-4 justify-between ">
            <div className="h-[2px] w-18 bg-[#7072a8]" />
            <span className="text-[#7072a8] uppercase tracking-[0.3em] text-4xl font-bold">
              Top Categories
            </span>
            <div className="h-[2px] w-18 bg-[#7072a8]" />
          </div>

        </div>

      </div>
      {/* --------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;