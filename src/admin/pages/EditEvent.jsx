import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

const EditEvent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setEventData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEventData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "total_tickets" &&
      Number(prev.available_tickets) === Number(prev.total_tickets)
        ? { available_tickets: value }
        : {}),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("events")
      .update({
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        badge: eventData.badge,
        icon: eventData.icon,
        image: eventData.image,
        payment_qr: eventData.payment_qr,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        price: eventData.price,
        total_tickets: eventData.total_tickets,
        available_tickets: eventData.available_tickets,
        status: eventData.status,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Event Updated Successfully");
    navigate("/admin/events");
  };

  return (
    <DashboardLayout>
      <PageHeader title="Edit Event" subtitle="Update Event Details" />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Title</label>
            <input type="text" name="title" value={eventData.title} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2" required />
          </div>

          <div>
            <label className="font-semibold">Category</label>
            <select name="category" value={eventData.category} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2">
              <option>Music</option><option>Sports</option><option>Comedy</option><option>Festival</option><option>Business</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Description</label>
            <textarea rows="4" name="description" value={eventData.description} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/>
          </div>

          <div>
            <label className="font-semibold">Badge</label>
            <input type="text" name="badge" value={eventData.badge} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/>
          </div>

          <div>
            <label className="font-semibold">Icon</label>
            <select name="icon" value={eventData.icon} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2">
              <option value="Music">Music</option><option value="Palette">Palette</option><option value="Trophy">Trophy</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Image URL</label>
            <input type="text" name="image" value={eventData.image} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/>
            {eventData.image && <img src={eventData.image} alt="Event" className="mt-4 w-64 rounded-lg border" />}
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Payment QR Image URL</label>
            <input type="text" name="payment_qr" value={eventData.payment_qr} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/>
            {eventData.payment_qr && <img src={eventData.payment_qr} alt="Payment QR" className="mt-4 w-52 h-52 object-contain border rounded-lg p-2" />}
          </div>

          <div><label>Date</label><input type="date" name="date" value={eventData.date} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>
          <div><label>Time</label><input type="time" name="time" value={eventData.time} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>
          <div><label>Location</label><input type="text" name="location" value={eventData.location} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>
          <div><label>Price</label><input type="number" name="price" value={eventData.price} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>
          <div><label>Total Tickets</label><input type="number" name="total_tickets" value={eventData.total_tickets} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>
          <div><label>Available Tickets</label><input type="number" name="available_tickets" value={eventData.available_tickets} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2"/></div>

          <div>
            <label>Status</label>
            <select name="status" value={eventData.status} onChange={handleChange} className="w-full border rounded-lg p-3 mt-2">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button type="button" onClick={() => navigate("/admin/events")} className="bg-gray-500 text-white px-6 py-3 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-6 py-3 rounded-lg">
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditEvent;
