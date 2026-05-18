export default function BestSellingSection() {
  const products = [
    {
      id: 1,
      title: "Classic Beige Heels",
      price: 73,
      oldPrice: 99,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Cream Pointed Heels",
      price: 73,
      oldPrice: 99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Black Slingback Heel",
      price: 73,
      oldPrice: 99,
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Minimal Nude Mules",
      price: 73,
      oldPrice: 99,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-[#f7f7f5] py-20 px-4 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Best Selling Items
          </h2>

          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Discover our most popular picks loved by customers.
          </p>
        </div>

        {/* Products */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="hidden lg:flex absolute left-[-28px] top-[40%] z-10 w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center hover:scale-110 transition-all duration-300">
            <span className="text-2xl">‹</span>
          </button>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                {/* Image Card */}
                <div className="relative bg-[#efefef] rounded-3xl overflow-hidden h-[420px] shadow-sm hover:shadow-2xl transition-all duration-500">
                  {/* Sale Badge */}
                  <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                    <span className="bg-rose-100 text-rose-500 text-[11px] font-semibold px-3 py-1 rounded-full">
                      −50%
                    </span>

                    <span className="bg-black text-white text-[11px] font-medium px-3 py-1 rounded-full">
                      ✦ Best Selling
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                    ♡
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info */}
                <div className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.price}$
                    </span>

                    <span className="text-gray-400 line-through text-lg">
                      {product.oldPrice}$
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-5 group-hover:text-black transition-colors">
                    {product.title}
                  </h3>

                  {/* Sizes */}
                  {/* <div className="flex items-center gap-3">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className="w-11 h-11 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="hidden lg:flex absolute right-[-28px] top-[40%] z-10 w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center hover:scale-110 transition-all duration-300">
            <span className="text-2xl">›</span>
          </button>
        </div>

        {/* CTA Button
        <div className="flex justify-center mt-16">
          <button className="group border border-black px-8 py-4 rounded-2xl text-base font-medium text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-xl">
            View All Collection

            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              ↗
            </span>
          </button>
        </div> */}
      </div>
    </section>
  );
}
