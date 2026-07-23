import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const FormFill = () => {
  return (
    <section className="w-full my-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col px-8 py-16 shadow-lg">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            What Are You Looking For?
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-6 max-w-2xl mx-auto">
            Tell us your travel needs and we’ll help you book the perfect ride.
          </p>

          <div className="block">
            <Link
              to="/form"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold rounded-full bg-white/20 text-white hover:text-black/90 hover:bg-white backdrop-blur-md transition-all duration-300"
            >
              <span>Book Now</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-orange-500/80">
                <ArrowRight className="w-5 h-5 text-black transition-all duration-300 group-hover:text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormFill;
