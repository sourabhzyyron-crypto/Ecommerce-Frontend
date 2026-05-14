import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-[#fafafa] border-t border-gray-200">
      {/* Newsletter Section */}
      {/* <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-10 py-14">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 md:px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg text-center lg:text-left">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full mb-4">
                NEWSLETTER
              </span>

              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Join our fashion community
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Subscribe to receive exclusive offers, trend updates, and early
                access to our latest collections.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <form
                className="relative"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  e.preventDefault()
                }
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-6 pr-36 text-sm text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-black hover:bg-blue-600 text-white px-6 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  Join Now
                  <FaArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <p className="text-gray-500 text-sm leading-relaxed mt-5 mb-8 max-w-sm">
              Discover premium fashion collections designed to elevate your
              everyday style with comfort, elegance, and quality.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: FaInstagram, link: "#" },
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaYoutube, link: "#" },
              ].map((social, index: number) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.link}
                    className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#7072a8] hover:text-white hover:border-transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
              Shop
            </h4>

            <ul className="space-y-4">
              {["All Products", "New Arrivals", "Featured", "Sale"].map(
                (item: string, index: number) => (
                  <li key={index}>
                    <a
                      href="/"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
              Support
            </h4>

            <ul className="space-y-4">
              {[
                "Shipping Policy",
                "Returns & Exchanges",
                "Track Order",
                "Contact Us",
              ].map((item: string, index: number) => (
                <li key={index}>
                  <a
                    href="/"
                    className="text-sm text-gray-500 hover:text-[#7072a8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
              Company
            </h4>

            <ul className="space-y-4">
              {["Our Story", "Sustainability", "Careers", "Blog"].map(
                (item: string, index: number) => (
                  <li key={index}>
                    <a
                      href="/"
                      className="text-sm text-gray-500 hover:text-[#7072a8] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-gray-400 text-center md:text-left">
              © {currentYear} STORENAME. All rights reserved.
            </p>
            {/* Payment Methods */}
            <div className="flex items-center gap-4 flex-wrap">
              {[
                {
                  name: "Visa",
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Visa_Inc._logo_%282014%E2%80%932021%29.svg/1920px-Visa_Inc._logo_%282014%E2%80%932021%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20210725073358",
                },
                {
                  name: "Mastercard",
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                },
                {
                  name: "PayPal",
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/UPI_logo.svg/960px-UPI_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
                },
                {
                  name: "Apple Pay",
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="w-20 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-2"
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="object-contain h-6 w-full"
                  />
                </div>
              ))}
            </div>

            {/* Policies */}
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <a href="/privacy" className="hover:text-black transition-colors">
                Privacy Policy
              </a>

              <a href="/terms" className="hover:text-black transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
