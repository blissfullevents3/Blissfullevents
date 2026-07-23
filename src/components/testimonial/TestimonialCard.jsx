import React from "react";
import { testimonials } from "../../constants";
import { Star } from "lucide-react";

const TestimonialCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl border border-slate-200 transition duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col items-start">
              <h3 className="text-base md:text-lg font-semibold text-slate-800">
                {testimonial.name}
              </h3>
              <p className="text-base md:text-lg text-gray-500">{testimonial.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-orange-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-orange-500" />
            ))}
          </div>

          <p className="text-slate-600 text-left">{testimonial.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
