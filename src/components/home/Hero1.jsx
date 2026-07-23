import React from "react";
import { CalendarCheck, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import hero2 from "../../assets/cars/hero2.jpg";
import { MapPin, Star, StarIcon } from "lucide-react";
import profile1 from "../../assets/profile/profile1.avif";
import profile2 from "../../assets/profile/profile2.avif";
import profile3 from "../../assets/profile/profile3.avif";

const Hero1 = () => {
  return (
    <section className="w-full bg-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-6 md:px-0 ">
        <div className="flex flex-col justify-center items-center md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 items-center py-10">
            <div className="flex flex-col item-start justify-center space-y-6">
              <div className="flex flex-col justify-center items-center md:items-start md:space-y-6">
                <div className="p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-violet-600 to-fuchsia-500 mb-2">
                  <div className="flex justify-center items-baseline gap-2 rounded-full py-2 px-4 bg-white">
                    <p className="text-purple-600 uppercase tracking-wide text-xs font-semibold">
                      Plan Your Perfect Event
                    </p>
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 text-center md:text-left md:leading-14">
                  We Plan. You Celebrate. <br />
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                    Memories That Last Forever
                  </span>{" "}
                </h2>

                <p className="hidden md:block text-base md:text-lg text-gray-500 text-center md:text-left">
                  Every celebration deserves perfection. From elegant weddings and corporate events to birthdays and special occasions, we transform your ideas into extraordinary experiences with impeccable planning and execution.
                </p>
              </div>

              <div className="hidden md:block">
                <div className="flex sm:flex-row flex-col items-start gap-6">
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-6 py-3 text-base text-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Plan Your Event
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-6 py-3 text-base border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-all duration-300 font-medium"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Watch Our Story
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src={hero2} alt="Car" className="w-full h-auto object-cover" />
            </div>
          </div>

          <p className="md:hidden text-base md:text-lg text-gray-500 text-center md:text-left">
            Every celebration deserves perfection. From elegant weddings and corporate events to birthdays and special occasions, we transform your ideas into extraordinary experiences with impeccable planning and execution.
          </p>

          <div className="w-full md:hidden block mt-4">
            <div className="flex sm:flex-row flex-col item-start gap-6">
              <Link
                to="/about"
                className="hidden md:block px-5 py-3 text-base border text-center border-purple-600 text-purple-600 rounded-md hover:bg-purple-100 transition-all duration-300 font-medium"
              >
                Learn More
              </Link>

              <Link
                to="/form"
                className="px-5 py-3 text-base text-center rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 font-medium"
              >
                Plan Your Event 
              </Link>
            </div>
          </div>

          {/* <div className="flex flex-col items-center my-4 space-y-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map(i=>(
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568L24 9.748l-6 5.884 1.416 8.268L12 18.896l-7.416 4.504L6 15.632 0 9.748l8.332-1.593z"/>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-slate-700 font-medium">5 Star Rating</span>
            </div>

            <p className="text-center text-base md:text-lg text-slate-700">
              Hundreds of customers booked our cars at best prices.
            </p>
          </div>*/}

          {/*<div className="max-w-3xl py-6 md:px-20">
            <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col px-8 py-6 shadow-lg">
              <div className="flex -space-x-2 py-2 items-center justify-center">
                <img src={profile1} alt="Albert" className="w-10 h-10 rounded-full border-2 border-white/20"/>
                <img src={profile2} alt="Albert" className="w-10 h-10 rounded-full border-2 border-white/20"/>
                <img src={profile3} alt="Albert" className="w-10 h-10 rounded-full border-2 border-white/20"/>
              </div>
              <h1 className="text-2xl font-playfair font-semibold text-white text-center">
                12.5K+ People
              </h1>
              <p className="text-base md:text-lg text-white/80 text-center">
                have used our services such as renting, buying, or even selling their car.
              </p>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Hero1;
