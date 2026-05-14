import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Streetwear",
    items: "120 Products",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Watches",
    items: "48 Products",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Sneakers",
    items: "96 Products",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Summer Fits",
    items: "74 Products",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Bags",
    items: "33 Products",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Minimal Wear",
    items: "58 Products",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Woman Fashion",
    items: "28 Products",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
  {
    id: 8,
    title: "Denim Collection",
    items: "36 Products",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  },
];

const Productcategories: React.FC = () => {
  return (
    <section className="bg-[#f5f5f5] py-24 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-gray-500">
              Fashion Categories
            </span>

            <h2 className="text-4xl md:text-6xl font-black mt-3 text-black leading-tight">
              Discover Your <br />
              <span className="text-gray-400">Perfect Style</span>
            </h2>
          </div>

          <button className="group flex items-center gap-2 w-fit px-6 py-3 bg-black text-white rounded-full hover:rounded-2xl transition-all duration-300">
            View All
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* NEW MODERN GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-5">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`
                relative overflow-hidden rounded-[2rem] group cursor-pointer
                ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : index === 3
                      ? "md:col-span-2"
                      : ""
                }
              `}
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* TOP TAG */}
              <div className="absolute top-4 left-4">
                <span className="backdrop-blur-xl bg-white/10 border border-white/20 text-white text-xs px-4 py-2 rounded-full">
                  Trending
                </span>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm opacity-80 mb-1">{cat.items}</p>

                  <h3
                    className={`font-black leading-tight ${
                      index === 0 ? "text-4xl md:text-5xl" : "text-2xl"
                    }`}
                  >
                    {cat.title}
                  </h3>

                  {/* BUTTON */}
                  <div className="mt-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition-all duration-300">
                      Explore
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* HOVER LIGHT EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -left-20 top-0 h-full w-24 bg-white/20 blur-2xl rotate-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Productcategories;
