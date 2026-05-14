import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  Headphones,
  Users,
  ArrowRight,
} from "lucide-react";
import Footer from "./Footer";

const About: React.FC = () => {
  const text = "Modern Elegance";

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);

        if (index + 1 === text.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);

        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <div className="min-h-screen bg-[#f7f7fb] text-[#1a1a1a] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-28 px-6">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#7072a8]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7072a8]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT */}
          <div>
            <span className="inline-block px-8 py-3 rounded-full bg-[#7072a8]/10 text-[#7072a8] text-lg md:text-xl font-bold tracking-[3px] uppercase shadow-md border border-[#7072a8]/20 backdrop-blur-sm">
              About Us
            </span>

            <h1 className="text-2xl md:text-5xl font-black leading-tight mt-6">
              We Create
              <br />{" "}
              <span className="text-[#7072a8] relative">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="mt-8 text-gray-500 text-lg leading-relaxed max-w-xl">
              We blend premium fashion with minimalist aesthetics to create
              timeless experiences for modern lifestyles. Every collection is
              designed with elegance, comfort, and individuality in mind.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="bg-[#7072a8] hover:bg-[#5f618f] transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#7072a8]/30">
                Explore Collection
                <ArrowRight size={18} />
              </button>

              <button className="border border-[#7072a8]/20 hover:bg-[#7072a8]/5 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-[#7072a8]">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                alt="fashion"
                className="w-full h-[600px] object-cover"
              />
            </div>

          
            {/* <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl w-64">
              <h3 className="text-4xl font-black text-[#7072a8]">10K+</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Customers trust our fashion-forward collections worldwide.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Premium Products"],
            ["24/7", "Customer Support"],
            ["5 Years", "Fashion Experience"],
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-300"
            >
              <h2 className="text-4xl font-black text-[#7072a8]">{item[0]}</h2>
              <p className="text-gray-500 mt-3 font-medium">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#7072a8] font-semibold uppercase tracking-[4px]">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-black mt-4">
              Crafted For Modern
              <span className="text-[#7072a8]"> Lifestyle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingBag size={28} />,
                title: "Premium Style",
                desc: "Carefully curated pieces inspired by modern aesthetics.",
              },
              {
                icon: <ShieldCheck size={28} />,
                title: "Secure Shopping",
                desc: "Fast and secure checkout with trusted payment systems.",
              },
              {
                icon: <Headphones size={28} />,
                title: "Human Support",
                desc: "Our team is always ready to assist your shopping journey.",
              },
              {
                icon: <Users size={28} />,
                title: "Community First",
                desc: "Building a strong fashion community around creativity.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#7072a8]/10 text-[#7072a8] flex items-center justify-center mb-6 group-hover:bg-[#7072a8] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default About;
