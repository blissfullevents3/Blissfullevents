import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

const AddEvent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    badge: "",
    icon: "",
    image: "",
    payment_qr: "",
    date: "",
    time: "",
    location: "",
    price: "",
    total_tickets: "",
    available_tickets: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEventData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "total_tickets"
        ? { available_tickets: value }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("events")
      .insert([eventData]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Event Added Successfully");

    navigate("/admin/events");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Add Event"
        subtitle="Create a new event"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Title */}

          <div>
            <label className="font-semibold">Title</label>

            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Category */}

          <div>
            <label className="font-semibold">Category</label>

            <select
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select Category</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Comedy</option>
              <option>Festival</option>
              <option>Business</option>
            </select>
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <label className="font-semibold">Description</label>

            <textarea
              rows="4"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Badge */}

          <div>
            <label className="font-semibold">Badge</label>

            <input
              type="text"
              name="badge"
              value={eventData.badge}
              onChange={handleChange}
              placeholder="Featured"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Icon */}

          <div>
            <label className="font-semibold">Icon</label>

            <select
              name="icon"
              value={eventData.icon}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select Icon</option>
              <option value="Music">Music</option>
              <option value="Palette">Palette</option>
              <option value="Trophy">Trophy</option>
            </select>
          </div>

          {/* Event Image */}

          <div className="md:col-span-2">
            <label className="font-semibold">Event Image URL</label>

            <input
              type="text"
              name="image"
              value={eventData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg p-3 mt-2"
            />

            {eventData.image && (
              <img
                src={eventData.image}
                alt="Event Preview"
                className="mt-4 w-64 rounded-lg border"
              />
            )}
          </div>

          {/* Payment QR */}

          <div className="md:col-span-2">
            <label className="font-semibold">
              Payment QR Image URL
            </label>

            <input
              type="text"
              name="payment_qr"
              value={eventData.payment_qr}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg p-3 mt-2"
            />

            {eventData.payment_qr && (
              <img
                src={eventData.payment_qr}
                alt="Payment QR"
                className="mt-4 w-52 h-52 object-contain border rounded-lg p-2"
              />
            )}
          </div>

          {/* Date */}

          <div>
            <label className="font-semibold">Date</label>

            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Time */}

          <div>
            <label className="font-semibold">Time</label>

            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Location */}

          <div>
            <label className="font-semibold">Location</label>

            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Price */}

          <div>
            <label className="font-semibold">Price (₹)</label>

            <input
              type="number"
              name="price"
              value={eventData.price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Total Tickets */}

          <div>
            <label className="font-semibold">
              Total Tickets
            </label>

            <input
              type="number"
              name="total_tickets"
              value={eventData.total_tickets}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Available Tickets */}

          <div>
            <label className="font-semibold">
              Available Tickets
            </label>

            <input
              type="number"
              name="available_tickets"
              value={eventData.available_tickets}
              readOnly
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Status */}

          <div>
            <label className="font-semibold">Status</label>

            <select
              name="status"
              value={eventData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-6 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Event"}
            </button>

          </div>

        </form>

      </div>
    </DashboardLayout>
  );
};

export default AddEvent;