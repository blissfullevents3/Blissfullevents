import React, { useState } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-hot-toast";
import QRCode from "qrcode";

import {
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
const BookingsTable = ({
  bookings,
  loading,
  refreshBookings,
  openBooking,
}) => {

  const [processingId, setProcessingId] = useState(null);
  const generateTicketNumber = () => {
  return `BE-${new Date().getFullYear()}-${Date.now()}`;
};
const generateQRCode = async (payload) => {
  return await QRCode.toDataURL(payload);
};
const approveBooking = async (booking) => {
  if (
    !window.confirm(
      "Approve this booking?"
    )
  )
    return;

  setProcessingId(booking.id);
      try {

      // Get Event

      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", booking.event_id)
        .single();

      if (eventError) throw eventError;

      // Check Ticket Availability

      if (event.available_tickets < booking.ticket_count) {
        toast.error("Not enough tickets available.");
        return;
      }

      // Check Existing Ticket

      const { data: existingTicket } = await supabase
        .from("tickets")
        .select("id")
        .eq("booking_id", booking.id)
        .maybeSingle();

      if (existingTicket) {
        toast.error("Ticket already generated.");
        return;
      }

      // Generate Ticket

      const ticketNumber = generateTicketNumber();

      const qrPayload = JSON.stringify({
        bookingId: booking.id,
        ticketNumber,
        customer: booking.customer_name,
        event: booking.event_name,
      });

      const qrCode = await generateQRCode(qrPayload);
            // Update Booking Status

      const { error: bookingError } = await supabase
        .from("bookings")
        .update({
          payment_status: "Verified",
          booking_status: "Approved",
        })
        .eq("id", booking.id);

      if (bookingError) throw bookingError;

      // Reduce Available Tickets

      const { error: ticketUpdateError } = await supabase
        .from("events")
        .update({
          available_tickets:
            event.available_tickets - booking.ticket_count,
        })
        .eq("id", booking.event_id);

      if (ticketUpdateError) throw ticketUpdateError;

      // Insert Ticket Record

      const { error: insertTicketError } = await supabase
        .from("tickets")
        .insert([
          {
            booking_id: booking.id,
            event_id: booking.event_id,
            ticket_number: ticketNumber,
            attendee_name: booking.customer_name,
            email: booking.email,
            phone: booking.phone,
            event_name: booking.event_name,
            ticket_count: booking.ticket_count,
            qr_code: qrCode,
            status: "Valid",
          },
        ]);

      if (insertTicketError) throw insertTicketError;

      toast.success("Booking approved successfully.");

      await refreshBookings();
          } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to approve booking.");
    } finally {
      setProcessingId(null);
    }
  };

  const rejectBooking = async (booking) => {
    if (!window.confirm("Reject this booking?")) return;

    setProcessingId(booking.id);

    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          payment_status: "Rejected",
          booking_status: "Rejected",
        })
        .eq("id", booking.id);

      if (error) throw error;

      toast.success("Booking rejected successfully.");

      await refreshBookings();

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to reject booking.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading bookings...
      </div>
    );
  }

  return (
        <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-200 rounded-lg">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">Booking ID</th>

            <th className="px-4 py-3 text-left">Customer</th>

            <th className="px-4 py-3 text-left">Event</th>

            <th className="px-4 py-3 text-center">Tickets</th>

            <th className="px-4 py-3 text-center">Amount</th>

            <th className="px-4 py-3 text-center">Payment</th>

            <th className="px-4 py-3 text-center">Booking</th>

            <th className="px-4 py-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center py-8 text-gray-500"
              >
                No bookings found.
              </td>

            </tr>

          ) : (

            bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-semibold">
                  #{booking.id}
                </td>

                <td className="px-4 py-4">

                  <div className="font-medium">
                    {booking.customer_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {booking.email}
                  </div>

                  <div className="text-sm text-gray-500">
                    {booking.phone}
                  </div>

                </td>

                <td className="px-4 py-4">

                  <div className="font-medium">
                    {booking.event_name}
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(
                      booking.created_at
                    ).toLocaleString()}
                  </div>

                </td>

                <td className="px-4 py-4 text-center">
                  {booking.ticket_count}
                </td>

                <td className="px-4 py-4 text-center font-semibold text-green-600">
                  ₹{booking.total_amount}
                </td>
                                <td className="px-4 py-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.payment_status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : booking.payment_status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.payment_status}
                  </span>

                </td>

                <td className="px-4 py-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.booking_status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : booking.booking_status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.booking_status}
                  </span>

                </td>

                <td className="px-4 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => openBooking(booking)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                      title="View Booking"
                    >
                      <FaEye />
                    </button>

                    {booking.booking_status !== "Approved" && (

                      <button
                        onClick={() => approveBooking(booking)}
                        disabled={processingId === booking.id}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg"
                        title="Approve Booking"
                      >
                        <FaCheckCircle />
                      </button>

                    )}

                    {booking.booking_status !== "Rejected" && (

                      <button
                        onClick={() => rejectBooking(booking)}
                        disabled={processingId === booking.id}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white p-2 rounded-lg"
                        title="Reject Booking"
                      >
                        <FaTimesCircle />
                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default BookingsTable;