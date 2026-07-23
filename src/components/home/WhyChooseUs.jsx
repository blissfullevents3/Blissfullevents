
import React from "react";
import { CalendarHeart, Flower2, Camera, Cake, Handshake, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: CalendarHeart,
    title: "Custom Event Planning",
    description:
      "Tailor-made event planning designed to match your vision, style and budget.",
  },
  {
    icon: Flower2,
    title: "Luxury Wedding Planning",
    description:
      "Elegant weddings with premium décor, entertainment and flawless coordination.",
  },
  {
    icon: Sparkles,
    title: "Creative Decoration",
    description:
      "Beautiful floral décor, themed setups and stunning stage designs for every celebration.",
  },
  {
    icon: Camera,
    title: "Photography & Videography",
    description:
      "Capture every special moment with professional photography and cinematic videography.",
  },
  {
    icon: Cake,
    title: "Birthdays & Private Parties",
    description:
      "From kids' birthdays to milestone celebrations, we create unforgettable experiences.",
  },
  {
    icon: Handshake,
    title: "End-to-End Management",
    description:
      "Venue booking, catering, entertainment, guest management and complete event execution.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white py-24">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl"></div>
      <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-fuchsia-200/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-5 py-2">
            <Sparkles className="w-4 h-4 text-purple-600"/>
            <span className="text-sm uppercase tracking-[3px] font-semibold text-purple-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-slate-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Blissful Events?
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            From intimate celebrations to grand weddings, we transform your vision
            into unforgettable memories through creativity, elegance and flawless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item,index)=>{
            const Icon=item.icon;
            return(
              <div key={index}
                className="group bg-white rounded-3xl p-8 border border-purple-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-8 group-hover:bg-purple-600 transition">
                  <Icon className="w-8 h-8 text-purple-600 group-hover:text-white transition"/>
                </div>

                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  {item.title}
                </h3>

                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mb-5"></div>

                <p className="text-gray-600 leading-8">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/*<div className="mt-20 rounded-3xl overflow-hidden bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-700 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white text-center lg:text-left">
            <h3 className="text-3xl md:text-5xl font-bold">
              Ready to Create Your Dream Event?
            </h3>
            <p className="mt-4 text-purple-100 text-lg">
              Let's make your celebration unforgettable with premium planning,
              elegant décor and flawless execution.
            </p>
          </div>

          <Link
            to="/contact"
            className="bg-white text-purple-700 font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition">
            Plan Your Event
          </Link>
        </div>*/}
      </div>
    </section>
  );
};

export default WhyChooseUs;
