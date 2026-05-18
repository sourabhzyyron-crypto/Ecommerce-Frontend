import React, { useState } from "react";
import Footer from "../Pages/Footer";

interface CartItem {
  id: string;
  name: string;
  platform: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {

  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fifa 19",
      platform: "PS4",
      price: 44.0,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop", // Replace with your actual asset paths
    },
    {
      id: "2",
      name: "Glacier White 500GB",
      platform: "PS4",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "3",
      name: "Platinum Headset",
      platform: "PS4",
      price: 119.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ]);

  const [shippingCost, setShippingCost] = useState<number>(5.0);
  const [promoCode, setPromoCode] = useState<string>("");

  // Handlers to update quantities
  const updateQuantity = (id: string, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const finalTotalCost = itemsSubtotal + shippingCost;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-200">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* ================= LEFT SIDE: SHOPPING CART LIST ================= */}
        <div className="col-span-1 lg:col-span-8 p-8 sm:p-10 bg-white">
          <div className="flex justify-between items-baseline border-b border-slate-100 pb-6 mb-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Shopping Cart
            </h1>
            <span className="text-lg font-semibold text-slate-700">
              {totalItemsCount} Items
            </span>
          </div>

          {/* Table Headers (Hidden on small screens) */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 px-2">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items List */}
          <div className="space-y-6">
            {items.length === 0 ? (
              <p className="text-slate-500 py-8 text-center">
                Your cart is empty.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-12 items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0 px-2 gap-4 sm:gap-0"
                >
                  {/* Info / Image */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4 items-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-md overflow-hidden flex-shrink-0 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-base">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-rose-500 mt-0.5">
                        {item.platform}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors mt-2 text-left w-fit"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 text-slate-500 hover:bg-slate-100 active:bg-slate-200 rounded flex items-center justify-center font-bold text-lg transition-colors border border-slate-200"
                    >
                      &minus;
                    </button>
                    <div className="w-10 h-8 border border-slate-200 rounded flex items-center justify-center text-sm font-semibold text-slate-700 bg-slate-50">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 text-slate-500 hover:bg-slate-100 active:bg-slate-200 rounded flex items-center justify-center font-bold text-lg transition-colors border border-slate-200"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Single Unit Price */}
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right text-slate-600 font-medium text-sm">
                    £{item.price.toFixed(2)}
                  </div>

                  {/* Row Aggregate Total */}
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right text-slate-800 font-semibold text-sm">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-10 pt-4 border-t border-slate-100">
            <a
              href="#continue"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#635BFF] hover:text-[#5346E0] transition-colors"
            >
              <span>&larr;</span> Continue Shopping
            </a>
          </div>
        </div>

        {/* ================= RIGHT SIDE: ORDER SUMMARY ================= */}
        <div className="col-span-1 lg:col-span-4 p-8 sm:p-10 bg-slate-50/80 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200/60 pb-6 mb-6 tracking-tight">
              Order Summary
            </h2>

            {/* Items Subtotal line */}
            <div className="flex justify-between items-center text-sm font-medium text-slate-600 mb-6 uppercase tracking-wider">
              <span>Items {totalItemsCount}</span>
              <span className="font-semibold text-slate-800">
                £{itemsSubtotal.toFixed(2)}
              </span>
            </div>

            {/* Shipping selection input */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Shipping
              </label>
              <div className="relative">
                <select
                  value={shippingCost}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-purple-400 appearance-none cursor-pointer"
                >
                  <option value={5.0}>Standard Delivery - £5.00</option>
                  <option value={15.0}>Express Delivery - £15.00</option>
                  <option value={0.0}>Store Pickup - Free</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Promo input wrapper */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Promo Code
              </label>
              <input
                type="text"
                placeholder="Enter your code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-purple-400 placeholder-slate-300 mb-3"
              />
              <button
                type="button"
                className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded uppercase text-xs tracking-wider transition-colors shadow-xs"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Checkout block footer area */}
          <div className="border-t border-slate-200 pt-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Cost
              </span>
              <span className="text-xl font-bold text-slate-800">
                £{finalTotalCost.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5346E0] text-white font-bold rounded text-xs tracking-widest uppercase transition-colors shadow-sm"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
