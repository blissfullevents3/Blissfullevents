import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";

import { supabase } from "../../services/supabase";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaSearch,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

const EventManagement = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const data = events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEvents(data);
  }, [search, events]);

  const fetchEvents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setEvents(data);
      setFilteredEvents(data);
    }

    setLoading(false);
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this event?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Event Deleted");

    fetchEvents();
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="Event Management"
        subtitle="Manage all events"
      />

      <div className="bg-white rounded-xl shadow p-6">

        {/* Top Bar */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

          <div className="relative">

            <FaSearch className="absolute top-4 left-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search Event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-10 pr-4 py-3 w-72"
            />

          </div>

          <div className="flex gap-3">

            <button
              onClick={fetchEvents}
              className="bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <FaSyncAlt />
              Refresh
            </button>

            <button
              onClick={() => navigate("/admin/events/add")}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <FaPlus />
              Add Event
            </button>

          </div>

        </div>

        {/* Table */}

        {loading ? (
          <div className="text-center py-10">
            Loading Events...
          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">Title</th>

                  <th className="p-3 text-left">Date</th>

                  <th className="p-3 text-left">Location</th>

                  <th className="p-3 text-left">Price</th>

                  <th className="p-3 text-left">Tickets</th>

                  <th className="p-3 text-left">Status</th>

                  <th className="p-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEvents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-10"
                    >
                      No Events Found
                    </td>

                  </tr>

                ) : (

                  filteredEvents.map((event) => (

                    <tr
                      key={event.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {event.title}
                      </td>

                      <td className="p-3">
                        {event.date}
                      </td>

                      <td className="p-3">
                        {event.location}
                      </td>

                      <td className="p-3">
                        ₹{event.price}
                      </td>

                      <td className="p-3">
                        {event.available_tickets}
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm
                          ${
                            event.status === "Active"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {event.status}
                        </span>

                      </td>

                      <td className="p-3">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/events/edit/${event.id}`
                              )
                            }
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() =>
                              deleteEvent(event.id)
                            }
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default EventManagement;