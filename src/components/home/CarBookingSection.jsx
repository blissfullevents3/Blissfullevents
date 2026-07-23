import React from "react";
import { Link } from "react-router-dom";

const CarBookingSection = () => {
  return (
    <section className="w-full bg-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-20 xl:px-0 grid grid-cols-1 md:grid-cols-12 items-center gap-6">
        <div className="md:col-span-8 space-y-6">
          <h2 className="text-3xl text-orange-900 md:text-5xl font-bold text-center md:text-left leading-tight">
            Choose Us for the Best Cars
          </h2>
          <p className="text-center md:text-left text-gray-700 text-sm md:text-base">
            Drive with confidence in our top-rated cars, trusted by thousands of
            happy customers. Whether it's luxury, comfort, or reliability we’ve
            got you covered.
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col md:flex-row items-center md:justify-end gap-4">
          <Link
            to="/book"
            className="w-full text-center px-5 py-3 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 font-medium "
          >
            Book Now
          </Link>
          <Link
            to="/carspage"
            className="w-full text-center px-5 py-3 rounded-md border border-orange-500 hover:bg-orange-200 font-medium text-gray-700 transition duration-300"
          >
            View Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarBookingSection;
