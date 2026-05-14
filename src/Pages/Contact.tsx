import React from "react";
import {
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f7f7fb] overflow-hidden text-[#1a1a1a]">
      {/* HERO SECTION */}
      <section className="relative py-28 px-6">
        {/* BACKGROUND BLURS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7072a8]/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7072a8]/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT SIDE */}
          <div>
            {/* BADGE */}
            <span className="inline-block px-8 py-3 rounded-full bg-[#7072a8]/10 text-[#7072a8] text-lg font-bold tracking-[3px] uppercase border border-[#7072a8]/20 shadow-md backdrop-blur-sm">
              Contact Us
            </span>

            {/* HEADING */}
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mt-8">
              Where Style
              <br />
              Meets
              <span className="text-[#7072a8] block mt-3">
                Elegance
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-gray-500 text-lg leading-relaxed max-w-xl">
              Have questions about our collections, orders, or collaborations?
              We’d love to hear from you. Connect with our team and discover
              fashion designed with elegance, comfort, and individuality.
            </p>

            {/* CONTACT INFO */}
            <div className="mt-12 space-y-6">
              {[
                {
                  icon: <FaRegEnvelope size={22} />,
                  title: "Email Us",
                  value: "hello@veloura.com",
                },
                {
                  icon: <FaPhoneAlt size={22} />,
                  title: "Call Us",
                  value: "+91 9876543210",
                },
                {
                  icon: <FaMapMarkerAlt size={22} />,
                  title: "Visit Store",
                  value: "Mumbai, India",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                >
                  {/* ICON */}
                  <div className="w-14 h-14 rounded-2xl bg-[#7072a8]/10 flex items-center justify-center text-[#7072a8]">
                    {item.icon}
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-500">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-10">
              {[FaInstagram, FaTwitter, FaFacebookF].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#7072a8] hover:bg-[#7072a8] hover:text-white hover:-translate-y-2 transition-all duration-300"
                  >
                    <Icon size={22} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* GLOW */}
            <div className="absolute inset-0 bg-[#7072a8]/10 blur-3xl rounded-full"></div>

            {/* FLOATING CARD */}
            <div className="absolute -top-6 -right-6 bg-white px-6 py-4 rounded-3xl shadow-2xl z-20 animate-bounce">
              <p className="text-sm text-gray-500">
                New Collection
              </p>

              <h3 className="font-black text-[#7072a8] text-xl">
                Summer 2026
              </h3>
            </div>

            {/* FORM CARD */}
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-[40px] p-10 overflow-hidden">
              {/* FORM TOP GLOW */}
              <div className="absolute top-0 left-0 w-full h-40 "></div>

              <div className="relative z-10">
                {/* FORM TITLE */}
                <h2 className="text-4xl font-black mb-3">
                  Connect With
                  <span className="text-[#7072a8]">
                    {" "}
                    Our Team
                  </span>
                </h2>

                <p className="text-gray-500 mb-10">
                  Fill out the form and our fashion team will
                  get back to you shortly.
                </p>

                {/* FORM */}
                <form className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-600">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-[#f7f7fb] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#7072a8] focus:ring-4 focus:ring-[#7072a8]/10 hover:shadow-lg hover:shadow-[#7072a8]/5 transition-all duration-300"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-600">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-[#f7f7fb] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#7072a8] focus:ring-4 focus:ring-[#7072a8]/10 hover:shadow-lg hover:shadow-[#7072a8]/5 transition-all duration-300"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-600">
                      Your Message
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Tell us about your fashion needs..."
                      className="w-full bg-[#f7f7fb] border border-gray-100 rounded-2xl px-6 py-4 outline-none resize-none focus:border-[#7072a8] focus:ring-4 focus:ring-[#7072a8]/10 hover:shadow-lg hover:shadow-[#7072a8]/5 transition-all duration-300"
                    ></textarea>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="group w-full bg-[#7072a8] hover:bg-[#5f618f] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-[#7072a8]/30 hover:scale-[1.02]"
                  >
                    Connect With Us

                    <FaPaperPlane
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
     <Footer />
    </div>
  );
};

export default Contact;