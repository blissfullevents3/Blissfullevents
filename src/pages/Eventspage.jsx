import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import EventCard from "../components/events/EventCard";
import FormFill from "../components/form/FormFill";

const EventsPage = () => {
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

    if (!error) {
      setEvents(data || []);
    }

    setLoading(false);
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto pt-36 pb-10 px-6">

        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 rounded-full px-5 py-2">
            <p className="text-purple-700 font-semibold">
              Events
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-6">
            Explore Upcoming Events
          </h1>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Discover concerts, festivals, sports, workshops,
            cultural events and much more. Book your tickets
            online in just a few clicks.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No events available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>

      <FormFill />
    </section>
  );
};

export default EventsPage;