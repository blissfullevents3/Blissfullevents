import React from "react";
import ReactMarkdown from "react-markdown";
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
              This is a test{event.title}
            </h1>

            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-gray-600 leading-8 mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-6 text-gray-600 leading-8 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 text-gray-600 leading-8 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {children}
                  </h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
              }}
            >
              {event.description}
            </ReactMarkdown>

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