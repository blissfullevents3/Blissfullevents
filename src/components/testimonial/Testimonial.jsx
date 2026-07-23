import React from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  return (
    <>
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 xl:px-0 text-center">
          <div className="flex flex-col items-center gap-6 mb-16">
            <div className="flex items-center gap-2 bg-orange-100 py-1 px-4 rounded-full shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
              <p className="uppercase font-semibold tracking-wide text-orange-600 text-sm">
                testimonial
              </p>
            </div>
            <h2 className="max-w-3xl text-4xl md:text-5xl font-semibold text-slate-800 leading-tight">
              What They Say About Our{" "}
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">
                Service
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mt-2">
              Hear from our satisfied customers who trust us for reliable,
              affordable, and hassle-free car rentals every time.
            </p>
          </div>
          <TestimonialCard />
        </div>
      </section>
    </>
  );
};

export default Testimonial;
