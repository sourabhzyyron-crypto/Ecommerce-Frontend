import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Minimalist Autumn",
    subtitle: "New Collection 2026",
    buttonText: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Timeless Comfort",
    subtitle: "Essential Layers",
    buttonText: "Explore",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000",
  },
];

const SlidingBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[85vh] min-h-[650px] overflow-hidden bg-[#313447]">
      {/* Top Blend: A soft gradient to bridge the gap between White Header and Dark Banner */}
      <div className=" absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent z-20 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col md:flex-row items-center"
        >
          {/* Text Content Area */}
          <div className="flex-1 px-10 md:px-20 lg:px-32 z-10 pt-32 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <p className="text-[#9da6cc] tracking-[0.5em] uppercase text-[10px] font-bold mb-6">
                {slides[currentIndex].subtitle}
              </p>
              
              <h2 className="text-[#eae0d7] text-6xl md:text-8xl font-serif leading-[1.1] mb-12 italic">
                {slides[currentIndex].title.split(' ')[0]}<br />
                <span className="not-italic opacity-90">{slides[currentIndex].title.split(' ')[1]}</span>
              </h2>

              <button className="group relative px-12 py-4 bg-[#7072a8] text-[#eae0d7] transition-all duration-500 overflow-hidden">
                <span className="relative z-10 uppercase tracking-widest text-xs font-bold transition-colors duration-300 group-hover:text-white">
                  {slides[currentIndex].buttonText}
                </span>
                <div className="absolute inset-0 bg-[#9da6cc] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </button>
            </motion.div>
          </div>

          {/* Image Side - Styled with a curve to blend with the soft UI of the header */}
          <div className="mt-12 flex-1 h-full w-full relative overflow-hidden md:rounded-tl-[120px] shadow-2xl">
            <motion.div 
               initial={{ scale: 1.15, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="h-full w-full"
            >
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#313447]/40 to-transparent z-10" />
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Grouped together for a cleaner look */}
      <div className="absolute right-12 bottom-12 z-30 flex items-center gap-6">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-[3px] transition-all duration-700 rounded-full ${
                index === currentIndex ? "w-12 bg-[#eae0d7]" : "w-4 bg-[#7072a8]/30 hover:bg-[#7072a8]/60"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={prevSlide}
            className="p-4 rounded-full border border-[#c6cad9]/10 text-[#eae0d7] hover:bg-[#eae0d7] hover:text-[#313447] transition-all duration-300 backdrop-blur-md bg-white/5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="p-4 rounded-full border border-[#c6cad9]/10 text-[#eae0d7] hover:bg-[#eae0d7] hover:text-[#313447] transition-all duration-300 backdrop-blur-md bg-white/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Background visual element for depth */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7072a8]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default SlidingBanner;