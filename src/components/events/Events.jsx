import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Music,
  Palette,
  Trophy,
  Ticket,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

import { supabase } from "../../services/supabase";

const iconMap = {
  Music,
  Palette,
  Trophy,
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "Active")
      .order("date", { ascending: true });

    if (error) {
      console.error("Supabase Error:", error.message);
    } else {
      setEvents(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-semibold text-purple-600">
          Loading Events...
        </h2>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-5 py-2">
            <Ticket className="w-4 h-4 text-purple-600" />

            <span className="uppercase tracking-[3px] text-sm font-semibold text-purple-700">
              Upcoming Events
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-gray-900">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Amazing Events
            </span>
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover concerts, workshops, sports screenings and unforgettable
            experiences happening near you.
          </p>
        </div>

        {/* No Events */}

        {events.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Events Available
            </h2>

            <p className="text-gray-500 mt-3">
              Please check back later.
            </p>
          </div>
        )}

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const Icon = iconMap[event.icon] || Ticket;

            return (
              <div
                key={event.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 transition"
              >
                {/* Image */}

                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />

                  <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                    {event.badge}
                  </span>
                </div>

                {/* Content */}

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="text-purple-600" size={26} />

                    <h3 className="text-2xl font-semibold">
                      {event.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-gray-500 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-6 space-y-3 text-gray-600">

                    <div className="flex items-center gap-2">
                      <CalendarDays className="text-purple-600" size={18} />
                      {event.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="text-purple-600" size={18} />
                      {event.time}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="text-purple-600" size={18} />
                      {event.location}
                    </div>

                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Starting From
                      </p>

                      <h3 className="text-3xl font-bold text-purple-700">
                        {event.price}
                      </h3>
                    </div>

                    <Link
                    to={`/event/${event.id}`}
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
                    >
                      View Details
                      </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;