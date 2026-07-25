import React, { useState } from "react";
import QRCode from "qrcode";
import { toast } from "react-hot-toast";
import {
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { supabase } from "../../services/supabase";
import { generateTicketId } from "../../services/ticketService";
import { uploadTicketQrImage } from "../../services/storage";
import { sendTicketEmail } from "../../services/emailService";

const BookingsTable = ({
  bookings,
  loading,
  refreshBookings,
  openBooking,
}) => {
  const [processingId, setProcessingId] = useState(null);

  const generateQRCode = async (payload) => {
    return await QRCode.toDataURL(payload, {
      width: 500,
      margin: 2,
    });
  };

  const approveBooking = async (booking) => {
    if (!window.confirm("Approve this booking?")) return;

    setProcessingId(booking.id);

    try {
      // Fetch latest event details
      const { data: event, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", booking.event_id)
        .single();

      if (eventError) throw eventError;

      if (!event) {
        throw new Error("Event not found.");
      }

      // Prevent duplicate approval
      if (booking.booking_status === "Approved") {
        toast.error("Booking has already been approved.");
        return;
      }

      // Validate ticket availability
      if (
        Number(event.available_tickets) <
        Number(booking.ticket_count)
      ) {
        toast.error("Not enough tickets available.");
        return;
      }

      // Generate Ticket ID
      const ticketId = generateTicketId();

      // Create QR payload
      const qrPayload = JSON.stringify({
        ticketId,
        bookingId: booking.id,
        customerName: booking.customer_name,
        customerEmail: booking.email,
        phone: booking.phone,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        location: event.location,
        ticketCount: booking.ticket_count,
        totalAmount: booking.total_amount,
        generatedAt: new Date().toISOString(),
      });

      // Generate QR Code
      const qrDataUrl = await generateQRCode(qrPayload);

      // Convert Base64 to Blob
      const response = await fetch(qrDataUrl);
      const qrBlob = await response.blob();

      // Upload QR to Supabase Storage
      const { data: uploadData, error: uploadError } =
        await uploadTicketQrImage(qrBlob, ticketId);

      if (uploadError) {
        throw uploadError;
      }

      const qrCodeUrl = uploadData.publicUrl;
            console.log("QR Code URL:", qrCodeUrl);
console.log("Booking ID:", booking.id);
      const { error: bookingUpdateError } = await supabase
        .from("bookings")
        .update({
          booking_status: "Approved",
          payment_status: "Verified",
          ticket_id: ticketId,
          qr_code_url: qrCodeUrl,
          email_sent: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);
      console.log("Booking Update Error:", bookingUpdateError);

      if (bookingUpdateError) {
        throw bookingUpdateError;
      }

      // Reduce available tickets
      const remainingTickets =
        Number(event.available_tickets) -
        Number(booking.ticket_count);

      const { error: eventUpdateError } = await supabase
        .from("events")
        .update({
          available_tickets: remainingTickets,
        })
        .eq("id", booking.event_id);

      if (eventUpdateError) {
        throw eventUpdateError;
      }

      // Send confirmation email
      const emailResult = await sendTicketEmail({
        customerName: booking.customer_name,
        customerEmail: booking.email,

        eventName: event.title,
        eventLocation: event.location,
        eventDate: event.date,
        eventTime: event.time,

        ticketId,
        ticketCount: booking.ticket_count,
        totalAmount: booking.total_amount,

        qrCodeUrl,
      });

      // Update email status only if email was sent successfully
      if (emailResult.success) {
        const { error: emailStatusError } = await supabase
          .from("bookings")
          .update({
            email_sent: true,
          })
          .eq("id", booking.id);

        if (emailStatusError) {
          console.error(
            "Failed to update email_sent flag:",
            emailStatusError
          );
        }

        toast.success(
          "Booking approved and confirmation email sent successfully."
        );
      } else {
        console.warn(emailResult.error);

        toast.success(
          "Booking approved successfully, but confirmation email could not be sent."
        );
      }

      await refreshBookings();
    } catch (error) {
      console.error("Approve Booking Error:", error);

      toast.error(
        error.message || "Failed to approve booking."
      );
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
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);

      if (error) throw error;

      toast.success("Booking rejected successfully.");

      await refreshBookings();
    } catch (error) {
      console.error("Reject Booking Error:", error);

      toast.error(
        error.message || "Failed to reject booking."
      );
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
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full bg-white">
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
                colSpan={8}
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
                  <div className="font-semibold">
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
                  <div className="font-semibold">
                    {booking.event_name}
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(
                      booking.created_at
                    ).toLocaleString()}
                  </div>

                  {booking.ticket_id && (
                    <div className="mt-1 text-xs text-green-600 font-medium">
                      Ticket : {booking.ticket_id}
                    </div>
                  )}
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
                        onClick={() =>
                          approveBooking(booking)
                        }
                        disabled={
                          processingId === booking.id
                        }
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg"
                        title="Approve Booking"
                      >
                        {processingId === booking.id ? (
                          "..."
                        ) : (
                          <FaCheckCircle />
                        )}
                      </button>
                    )}

                    {booking.booking_status !== "Rejected" && (
                      <button
                        onClick={() =>
                          rejectBooking(booking)
                        }
                        disabled={
                          processingId === booking.id
                        }
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