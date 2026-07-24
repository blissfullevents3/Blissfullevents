import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";

import { supabase } from "../../services/supabase";

import {
  uploadEventImage,
  uploadQrImage,
  deleteStorageFile,
} from "../../services/storage";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [eventImageFile, setEventImageFile] = useState(null);
  const [qrImageFile, setQrImageFile] = useState(null);

  const [eventPreview, setEventPreview] = useState("");
  const [qrPreview, setQrPreview] = useState("");

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
    useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setEventData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        badge: data.badge || "",
        icon: data.icon || "",
        image: data.image || "",
        payment_qr: data.payment_qr || "",
        date: data.date || "",
        time: data.time || "",
        location: data.location || "",
        price: data.price || "",
        total_tickets: data.total_tickets || "",
        available_tickets: data.available_tickets || "",
        status: data.status || "Active",
      });

      setEventPreview(data.image || "");
      setQrPreview(data.payment_qr || "");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEventData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "total_tickets" &&
      Number(prev.available_tickets) === Number(prev.total_tickets)
        ? {
            available_tickets: value,
          }
        : {}),
    }));
  };
    const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let eventImageUrl = eventData.image;
      let qrImageUrl = eventData.payment_qr;

      let oldEventPath = null;
      let oldQrPath = null;

      // Upload new Event Image
      if (eventImageFile) {
        const { data, error } = await uploadEventImage(eventImageFile);

        if (error) throw error;

        eventImageUrl = data.publicUrl;

        if (
          eventData.image &&
          eventData.image.includes("/storage/v1/object/public/event-assets/")
        ) {
          oldEventPath = eventData.image.split("/event-assets/")[1];
        }
      }

      // Upload new Payment QR
      if (qrImageFile) {
        const { data, error } = await uploadQrImage(qrImageFile);

        if (error) throw error;

        qrImageUrl = data.publicUrl;

        if (
          eventData.payment_qr &&
          eventData.payment_qr.includes("/storage/v1/object/public/event-assets/")
        ) {
          oldQrPath = eventData.payment_qr.split("/event-assets/")[1];
        }
      }

      // Update database
      const { error } = await supabase
        .from("events")
        .update({
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
          price: eventData.price,
          total_tickets: eventData.total_tickets,
          available_tickets: eventData.available_tickets,
          status: eventData.status,
        })
        .eq("id", id);

      if (error) throw error;

      // Delete old storage files AFTER successful update
      if (oldEventPath) {
        await deleteStorageFile(oldEventPath);
      }

      if (oldQrPath) {
        await deleteStorageFile(oldQrPath);
      }

      toast.success("Event updated successfully!");

      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
    return (
    <DashboardLayout>
      <PageHeader
        title="Edit Event"
        subtitle="Update your event information"
      />

      <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >{/* Title */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Event Title
  </label>

  <input
    type="text"
    name="title"
    value={eventData.title}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    placeholder="Enter Event Title"
    required
  />
</div>

{/* Category */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Category
  </label>

  <select
    name="category"
    value={eventData.category}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
  >
    <option value="">Select Category</option>
    <option value="Music">Music</option>
    <option value="Sports">Sports</option>
    <option value="Comedy">Comedy</option>
    <option value="Festival">Festival</option>
    <option value="Business">Business</option>
  </select>
</div>

{/* Description */}
<div className="md:col-span-2">
  <label className="block text-sm font-semibold mb-2">
    Description
  </label>

  <textarea
    rows={5}
    name="description"
    value={eventData.description}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    placeholder="Describe your event..."
  />
</div>

{/* Badge */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Badge
  </label>

  <input
    type="text"
    name="badge"
    value={eventData.badge}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    placeholder="e.g. Featured"
  />
</div>

{/* Icon */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Icon
  </label>

  <select
    name="icon"
    value={eventData.icon}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
  >
    <option value="">Select Icon</option>
    <option value="Music">Music</option>
    <option value="Palette">Palette</option>
    <option value="Trophy">Trophy</option>
  </select>
</div>
{/* Event Image */}
<div className="md:col-span-2">
  <label className="block text-sm font-semibold mb-2">
    Event Image
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full border rounded-lg p-3"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setEventImageFile(file);
      setEventPreview(URL.createObjectURL(file));
    }}
  />

  {eventPreview && (
    <div className="mt-4">
      <img
        src={eventPreview}
        alt="Event Preview"
        className="w-72 rounded-lg border shadow"
      />
    </div>
  )}
</div>

{/* Payment QR */}
<div className="md:col-span-2">
  <label className="block text-sm font-semibold mb-2">
    Payment QR Code
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full border rounded-lg p-3"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setQrImageFile(file);
      setQrPreview(URL.createObjectURL(file));
    }}
  />

  {qrPreview && (
    <div className="mt-4">
      <img
        src={qrPreview}
        alt="QR Preview"
        className="w-56 h-56 object-contain rounded-lg border shadow p-2"
      />
    </div>
  )}
</div>
{/* Date */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Event Date
  </label>

  <input
    type="date"
    name="date"
    value={eventData.date}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    required
  />
</div>

{/* Time */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Event Time
  </label>

  <input
    type="time"
    name="time"
    value={eventData.time}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    required
  />
</div>

{/* Location */}
<div className="md:col-span-2">
  <label className="block text-sm font-semibold mb-2">
    Location
  </label>

  <input
    type="text"
    name="location"
    value={eventData.location}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    placeholder="Enter Event Location"
    required
  />
</div>

{/* Price */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Ticket Price (₹)
  </label>

  <input
    type="number"
    name="price"
    value={eventData.price}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    min="0"
    required
  />
</div>

{/* Total Tickets */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Total Tickets
  </label>

  <input
    type="number"
    name="total_tickets"
    value={eventData.total_tickets}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    min="1"
    required
  />
</div>

{/* Available Tickets */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Available Tickets
  </label>

  <input
    type="number"
    name="available_tickets"
    value={eventData.available_tickets}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
    min="0"
    required
  />
</div>

{/* Status */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Status
  </label>

  <select
    name="status"
    value={eventData.status}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
</div>
        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  </DashboardLayout>
  );
};

export default EditEvent;