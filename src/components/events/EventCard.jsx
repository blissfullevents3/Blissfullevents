import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        {event.badge && (
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {event.badge}
          </span>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {event.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2 text-gray-600 text-sm">

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {event.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            {event.time}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {event.location}
          </div>

        </div>

        <div className="flex justify-between items-center mt-6">

          <div>
            <p className="text-gray-500 text-sm">Ticket Price</p>

            <p className="text-2xl font-bold text-purple-600">
              ₹{event.price}
            </p>
          </div>

          <Link
            to={`/event/${event.id}`}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
          >
            View
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </div>
  );
};

export default EventCard;
