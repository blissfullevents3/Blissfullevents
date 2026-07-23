import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

const IndividualEventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <div className="w-full py-12">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-72 md:h-[450px] object-cover rounded-xl shadow-lg"
        />

        <div className="flex flex-col justify-between">

          <div>

            {event.badge && (
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {event.badge}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-800 mb-5">
              {event.title}
            </h1>

            <p className="text-gray-600 leading-8">
              {event.description}
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-gray-700">
                <CalendarDays className="text-purple-600" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="text-purple-600" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-purple-600" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Ticket className="text-purple-600" />
                <span>₹{event.price}</span>
              </div>

            </div>

          </div>

          <Link
            to={`/booking/${event.id}`}
            className="mt-10 w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Book Tickets
          </Link>

        </div>

      </div>

    </div>
  );
};

export default IndividualEventDetails;