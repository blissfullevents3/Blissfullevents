import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  User,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";

import { supabase } from "../services/supabase";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    email: "",
    ticket_count: 1,
    utr_number: "",
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);
const handleBooking = async () => {
  if (!formData.customer_name.trim()) {
    alert("Please enter your name.");
    return;
  }

  if (!formData.phone.trim()) {
    alert("Please enter your phone number.");
    return;
  }

  if (!formData.email.trim()) {
    alert("Please enter your email.");
    return;
  }

  if (!formData.utr_number.trim()) {
    alert("Please enter the UTR number.");
    return;
  }

  if (formData.ticket_count > event.available_tickets) {
    alert("Requested tickets are not available.");
    return;
  }

  setBookingLoading(true);

  const bookingData = {
    event_id: event.id,
    event_name: event.title,
    customer_name: formData.customer_name,
    phone: formData.phone,
    email: formData.email,
    ticket_count: Number(formData.ticket_count),
    total_amount: totalAmount,
    utr_number: formData.utr_number,
    payment_status: "Pending",
    booking_status: "Pending",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([bookingData]);

  setBookingLoading(false);

  if (error) {
    console.error(error);

    alert("Booking failed. Please try again.");

    return;
  }

  alert(
    "🎉 Booking submitted successfully!\n\nYour payment is under verification.\nYou'll receive your ticket after admin approval."
  );

  navigate("/events");
};

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const increaseTickets = () => {
    if (!event) return;

    if (formData.ticket_count < event.available_tickets) {
      setFormData({
        ...formData,
        ticket_count: formData.ticket_count + 1,
      });
    }
  };

  const decreaseTickets = () => {
    if (formData.ticket_count > 1) {
      setFormData({
        ...formData,
        ticket_count: formData.ticket_count - 1,
      });
    }
  };

  const totalAmount = event
    ? Number(event.price) * Number(formData.ticket_count)
    : 0;
      if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-purple-600">
          Loading Booking...
        </h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Event Not Found
        </h2>
      </div>
    );
  }
    return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Complete Your Booking
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}

          <div className="space-y-8">

            {/* Event Card */}

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <img
                src={event.image}
                alt={event.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-8">

                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {event.badge}
                </span>

                <h2 className="text-3xl font-bold mt-5">
                  {event.title}
                </h2>

                <p className="mt-4 text-gray-600 leading-7">
                  {event.description}
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">
                    <CalendarDays className="text-purple-600" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="text-purple-600" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-purple-600" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Ticket className="text-purple-600" />
                    <span>{event.available_tickets} Tickets Available</span>
                  </div>

                </div>

                <div className="mt-8 border-t pt-6 flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Price Per Ticket
                    </p>

                    <h2 className="text-4xl font-bold text-purple-700">
                      ₹{event.price}
                    </h2>
                  </div>

                </div>

              </div>
            </div>

            {/* Payment QR */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Scan & Pay
              </h2>

              <div className="flex justify-center">

                <img
                  src={event.payment_qr}
                  alt="Payment QR"
                  className="w-72 border rounded-xl"
                />

              </div>

              <p className="text-center text-gray-500 mt-6">
                Complete your payment using any UPI application and enter the
                UTR number on the booking form.
              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <h2 className="text-3xl font-bold mb-8">
              Customer Details
            </h2>

            <div className="space-y-6">

              {/* Name */}

              <div>

                <label className="font-medium">
                  Full Name
                </label>

                <div className="relative mt-2">

                  <User className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                </div>

              </div>

              {/* Phone */}

              <div>

                <label className="font-medium">
                  Phone Number
                </label>

                <div className="relative mt-2">

                  <Phone className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="font-medium">
                  Email Address
                </label>

                <div className="relative mt-2">

                  <Mail className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                </div>

              </div>

              {/* Ticket Counter */}

              <div>

                <label className="font-medium">
                  Number of Tickets
                </label>

                <div className="flex items-center gap-4 mt-4">

                  <button
                    type="button"
                    onClick={decreaseTickets}
                    className="w-12 h-12 rounded-full bg-purple-600 text-white text-xl"
                  >
                    −
                  </button>

                  <div className="text-3xl font-bold w-20 text-center">
                    {formData.ticket_count}
                  </div>

                  <button
                    type="button"
                    onClick={increaseTickets}
                    className="w-12 h-12 rounded-full bg-purple-600 text-white text-xl"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Total */}

              <div className="bg-purple-50 rounded-xl p-6">

                <div className="flex justify-between items-center">

                  <span className="text-lg font-semibold">
                    Total Amount
                  </span>

                  <span className="text-3xl font-bold text-purple-700">
                    ₹{totalAmount}
                  </span>

                </div>

              </div>

              {/* UTR */}

              <div>

                <label className="font-medium">
                  UTR Number
                </label>

                <div className="relative mt-2">

                  <CreditCard className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    name="utr_number"
                    value={formData.utr_number}
                    onChange={handleChange}
                    placeholder="Enter UTR Number"
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                </div>

              </div>

              {/* Book Button */}

              <button
                type="button"
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {bookingLoading ? "Booking..." : "Book Now"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
  
};

export default BookingPage;