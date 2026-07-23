import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import { toast } from "react-hot-toast";

import BookingStats from "../components/BookingStats";
import BookingsTable from "../components/BookingsTable";
import BookingModal from "../components/BookingModal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setBookings(data || []);
      setFilteredBookings(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredBookings(bookings);
      return;
    }

    const keyword = search.toLowerCase();

    setFilteredBookings(
      bookings.filter(
        (b) =>
          b.customer_name?.toLowerCase().includes(keyword) ||
          b.email?.toLowerCase().includes(keyword) ||
          b.phone?.includes(keyword) ||
          b.event_name?.toLowerCase().includes(keyword)
      )
    );
  }, [search, bookings]);

  const openBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeBooking = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Bookings"
        subtitle="Manage Event Bookings"
      />

      <BookingStats bookings={bookings} />

      <div className="bg-white rounded-xl shadow-lg mt-6 p-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

          <input
            type="text"
            placeholder="Search bookings..."
            className="border rounded-lg px-4 py-2 w-full md:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={fetchBookings}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Refresh
          </button>

        </div>

        <BookingsTable
          bookings={filteredBookings}
          loading={loading}
          refreshBookings={fetchBookings}
          openBooking={openBooking}
        />

      </div>

      <BookingModal
        show={showModal}
        booking={selectedBooking}
        onClose={closeBooking}
        refreshBookings={fetchBookings}
      />

    </DashboardLayout>
  );
};

export default Bookings;