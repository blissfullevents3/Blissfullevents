import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Image as ImageIcon,
  QrCode,
  Save,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../../services/supabase";
import {
  uploadEventImage,
  uploadQrImage,
  validateImage,
} from "../../services/storage";

const categories = [
  "Music",
  "Sports",
  "Comedy",
  "Festival",
  "Workshop",
  "Conference",
  "College",
  "Gaming",
];

const badges = [
  "Trending",
  "Popular",
  "Limited",
  "New",
  "Featured",
];

const AddEvent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [eventImage, setEventImage] = useState(null);
  const [qrImage, setQrImage] = useState(null);

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (!files || files.length === 0) return;

    const file = files[0];

    const validation = validateImage(file);

    if (validation) {
      toast.error(validation);
      return;
    }

    if (name === "eventImage") {
      setEventImage(file);

      setEventData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }

    if (name === "qrImage") {
      setQrImage(file);

      setEventData((prev) => ({
        ...prev,
        payment_qr: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let eventImageUrl = "";
      let qrImageUrl = "";

      if (eventImage) {
        const { data, error } =
          await uploadEventImage(eventImage);

        if (error) throw error;

        eventImageUrl = data.publicUrl;
      }

      if (qrImage) {
        const { data, error } =
          await uploadQrImage(qrImage);

        if (error) throw error;

        qrImageUrl = data.publicUrl;
      }
            const { error } = await supabase
        .from("events")
        .insert([
          {
            title: eventData.title,
            description: eventData.description,
            category: eventData.category,
            badge: eventData.badge,
            icon: eventData.icon,
            image: eventImageUrl,
            payment_qr: qrImageUrl,
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            price: Number(eventData.price),
            total_tickets: Number(eventData.total_tickets),
            available_tickets: Number(eventData.total_tickets),
            status: eventData.status,
          },
        ]);

      if (error) throw error;

      toast.success("Event added successfully!");

      navigate("/admin/events");
    } catch (err) {
      console.error(err);

      toast.error(err.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Add New Event
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new event for Blissful Events.
            </p>

          </div>

          <button
            onClick={() => navigate("/admin/events")}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <ArrowLeft size={18} />

            Back
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
                placeholder="Enter Event Title"
              />

            </div>

            <div>

              <label className="font-semibold">
                Category
              </label>

              <select
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}

              </select>

            </div>

            <div className="md:col-span-2">

              <label className="font-semibold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="font-semibold">
                Badge
              </label>

              <select
                name="badge"
                value={eventData.badge}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              >

                <option value="">
                  Select Badge
                </option>

                {badges.map((badge) => (
                  <option
                    key={badge}
                    value={badge}
                  >
                    {badge}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Icon Name
              </label>

              <input
                type="text"
                name="icon"
                value={eventData.icon}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
                placeholder="Music, Trophy, Palette..."
              />

            </div>
                        {/* Event Image */}

            <div className="md:col-span-2">

              <label className="font-semibold flex items-center gap-2">
                <ImageIcon size={18} />
                Event Image
              </label>

              <input
                type="file"
                name="eventImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

              {eventData.image && (
                <img
                  src={eventData.image}
                  alt="Event Preview"
                  className="mt-4 w-72 h-48 object-cover rounded-xl border"
                />
              )}

            </div>

            {/* Payment QR */}

            <div className="md:col-span-2">

              <label className="font-semibold flex items-center gap-2">
                <QrCode size={18} />
                Payment QR Code
              </label>

              <input
                type="file"
                name="qrImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

              {eventData.payment_qr && (
                <img
                  src={eventData.payment_qr}
                  alt="QR Preview"
                  className="mt-4 w-56 rounded-xl border"
                />
              )}

            </div>

            {/* Date */}

            <div>

              <label className="font-semibold flex items-center gap-2">
                <Calendar size={18} />
                Event Date
              </label>

              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Time */}

            <div>

              <label className="font-semibold flex items-center gap-2">
                <Clock size={18} />
                Event Time
              </label>

              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Location */}

            <div className="md:col-span-2">

              <label className="font-semibold flex items-center gap-2">
                <MapPin size={18} />
                Event Location
              </label>

              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
                placeholder="Venue / Address"
              />

            </div>

            {/* Price */}

            <div>

              <label className="font-semibold flex items-center gap-2">
                <Tag size={18} />
                Ticket Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={eventData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full mt-2 border rounded-lg p-3"
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
                min="1"
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Available Tickets */}

            <div>

              <label className="font-semibold">
                Available Tickets
              </label>

              <input
                type="number"
                value={eventData.available_tickets}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />

            </div>

            {/* Status */}

            <div>

              <label className="font-semibold">
                Status
              </label>

              <select
                name="status"
                value={eventData.status}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>
                      </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">

            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              <Save size={18} />

              {loading ? "Saving Event..." : "Save Event"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AddEvent;