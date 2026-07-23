import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Users,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../services/supabase";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error.message);
    } else {
      setEvent(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-purple-600">
          Loading Event...
        </h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Event not found
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 mb-8 hover:text-purple-800"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Top Section */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Image */}

          <div>
            <img
              src={event.image}
              alt={event.title}
              className="w-full rounded-3xl shadow-xl object-cover"
            />
          </div>

          {/* Details */}

          <div>

            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              {event.badge}
            </span>

            <h1 className="text-5xl font-bold mt-5">
              {event.title}
            </h1>

            <p className="mt-6 text-gray-600 leading-8">
              {event.description}
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-3">
                <CalendarDays className="text-purple-600" />
                {event.date}
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-purple-600" />
                {event.time}
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-purple-600" />
                {event.location}
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-purple-600" />
                {event.available_tickets} Tickets Available
              </div>

            </div>

            {/* Price */}

            <div className="mt-10">

              <p className="text-gray-500">
                Ticket Price
              </p>

              <h2 className="text-5xl font-bold text-purple-700">
                ₹ {event.price}
              </h2>

            </div>

            {/* Book Button */}

            <button
              onClick={() => navigate(`/booking/${event.id}`)}
              className="mt-10 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-4 rounded-xl text-lg font-semibold hover:scale-[1.02] transition"
            >
              <Ticket className="inline mr-2" size={20} />
              Book Now
            </button>

          </div>
        </div>

        {/* Payment QR Preview */}

        {event.payment_qr && (
          <div className="mt-20 bg-white rounded-3xl shadow-lg p-10">

            <h2 className="text-3xl font-bold mb-6">
              Payment QR
            </h2>

            <div className="flex justify-center">
              <img
                src={event.payment_qr}
                alt="Payment QR"
                className="w-72 rounded-xl border"
              />
            </div>

            <p className="text-center text-gray-500 mt-5">
              After clicking <strong>Book Now</strong>, you'll enter your
              details and submit the UTR number after completing the payment.
            </p>

          </div>
        )}

      </div>
    </section>
  );
};

export default EventDetails;