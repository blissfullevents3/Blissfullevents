import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import PageHeader from "../components/PageHeader";

import { supabase } from "../../services/supabase";

import {
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalCustomers: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // =========================
      // Events Count
      // =========================

      const { count: totalEvents } = await supabase
        .from("events")
        .select("*", {
          count: "exact",
          head: true,
        });

      // =========================
      // Bookings Count
      // =========================

      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        });

      // =========================
      // Revenue
      // =========================

      const { data: revenueData } = await supabase
        .from("bookings")
        .select("total_amount");

      const revenue =
        revenueData?.reduce(
          (sum, item) => sum + Number(item.total_amount || 0),
          0
        ) || 0;

      // =========================
      // Customers
      // =========================

      const { data: customerData } = await supabase
        .from("bookings")
        .select("email");

      const uniqueCustomers = new Set(
        customerData?.map((c) => c.email)
      );

      // =========================
      // Recent Bookings
      // =========================

      const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

      // =========================
      // Upcoming Events
      // =========================

      const { data: events } = await supabase
        .from("events")
        .select("*")
        .order("date", {
          ascending: true,
        })
        .limit(5);

      setStats({
        totalEvents: totalEvents || 0,
        totalBookings: totalBookings || 0,
        totalCustomers: uniqueCustomers.size,
        revenue,
      });

      setRecentBookings(bookings || []);
      setUpcomingEvents(events || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Administrator 👋"
      />

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Events"
          value={stats.totalEvents}
          color="bg-purple-600"
          icon={<FaCalendarAlt />}
        />

        <DashboardCard
          title="Bookings"
          value={stats.totalBookings}
          color="bg-blue-600"
          icon={<FaClipboardList />}
        />

        <DashboardCard
          title="Customers"
          value={stats.totalCustomers}
          color="bg-green-600"
          icon={<FaUsers />}
        />

        <DashboardCard
          title="Revenue"
          value={`₹${stats.revenue}`}
          color="bg-orange-500"
          icon={<FaMoneyBillWave />}
        />

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow mt-8 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/admin/events/add")}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700"
          >
            <FaPlus />
            Add Event
          </button>

          <button
            onClick={() => navigate("/admin/bookings")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaArrowRight />
            View Bookings
          </button>

        </div>

      </div>

      {/* Recent Bookings */}

      <div className="bg-white rounded-xl shadow mt-8 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Tickets</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {recentBookings.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6"
                  >
                    No Bookings Found
                  </td>
                </tr>

              ) : (

                recentBookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {booking.customer_name}
                    </td>

                    <td className="p-3">
                      {booking.event_name}
                    </td>

                    <td className="p-3">
                      {booking.ticket_count}
                    </td>

                    <td className="p-3">
                      ₹{booking.total_amount}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          booking.booking_status === "Approved"
                            ? "bg-green-600"
                            : booking.booking_status === "Rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {booking.booking_status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Upcoming Events */}

      <div className="bg-white rounded-xl shadow mt-8 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Upcoming Events
        </h2>

        <div className="space-y-4">

          {upcomingEvents.length === 0 ? (

            <p>No Events Available</p>

          ) : (

            upcomingEvents.map((event) => (

              <div
                key={event.id}
                className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-semibold">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {event.date}
                  </p>

                </div>

                <div className="text-purple-600 font-medium">
                  {event.location}
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;