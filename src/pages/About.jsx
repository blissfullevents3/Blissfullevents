import React from "react";
import {
  CalendarDays,
  Users,
  Sparkles,
} from "lucide-react";

import Satisfaction from "../components/about/Satisfaction";
import aboutImage from "../assets/cars/hero2.jpg"; // Add your image here

const About = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-20">

          <div className="inline-flex items-center bg-purple-100 px-5 py-2 rounded-full mb-6">
            <span className="text-purple-700 font-semibold">
              About Blissful Events
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Creating{" "}
            <span className="text-purple-600">
              Unforgettable
            </span>{" "}
            Event Experiences
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
            Blissful Events is your trusted platform for discovering,
            organizing, and booking unforgettable events. From concerts and
            cultural festivals to workshops, sports events, and entertainment
            shows, we make every celebration memorable.
          </p>

        </div>

        {/* About */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

          <div>

            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Blissful Events was founded with one goal—to make event booking
              simple, secure, and enjoyable. We connect organizers with people
              looking for unforgettable experiences.
            </p>

            <p className="text-gray-600 leading-8 mb-5">
              Our platform allows users to discover events, reserve seats,
              complete secure payments, and receive QR-code-based tickets
              instantly.
            </p>

            <p className="text-gray-600 leading-8">
              Whether you're attending a music concert, a workshop, a sports
              event, or a cultural festival, Blissful Events ensures a smooth
              booking experience from start to finish.
            </p>

          </div>

          <div>

            <img
              src={aboutImage}
              alt="Blissful Events"
              className="rounded-3xl shadow-2xl w-full"
            />

          </div>

        </div>

        {/* Features */}

        <div className="mb-24">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Blissful Events?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <CalendarDays
                size={60}
                className="mx-auto text-purple-600 mb-5"
              />

              <h3 className="text-2xl font-semibold mb-4">
                Exciting Events
              </h3>

              <p className="text-gray-600">
                Discover concerts, festivals, sports, exhibitions,
                workshops, and many more experiences across different
                categories.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <Users
                size={60}
                className="mx-auto text-purple-600 mb-5"
              />

              <h3 className="text-2xl font-semibold mb-4">
                Trusted Platform
              </h3>

              <p className="text-gray-600">
                Thousands of users trust our platform for fast booking,
                transparent pricing, and reliable customer support.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <Sparkles
                size={60}
                className="mx-auto text-purple-600 mb-5"
              />

              <h3 className="text-2xl font-semibold mb-4">
                Seamless Booking
              </h3>

              <p className="text-gray-600">
                Secure payments, instant confirmation, QR-code tickets,
                and hassle-free event entry—all in one place.
              </p>

            </div>

          </div>

        </div>

        <Satisfaction />

      </div>
    </section>
  );
};

export default About;