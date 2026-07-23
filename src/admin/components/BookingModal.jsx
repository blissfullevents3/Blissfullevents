import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const BookingModal = ({
  show,
  booking,
  onClose,
}) => {

  const [ticket, setTicket] = useState(null);

  useEffect(() => {

    if (!booking) return;

    fetchTicket();

  }, [booking]);

  const fetchTicket = async () => {

    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("booking_id", booking.id)
      .maybeSingle();

    setTicket(data);

  };

  if (!show || !booking) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Booking Details
            </h2>

            <p className="text-indigo-100">
              Booking #{booking.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-300"
          >
            ×
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">

          <div>

            <h3 className="font-bold text-lg mb-4">
              Customer Details
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Name</strong><br />
                {booking.customer_name}
              </p>

              <p>
                <strong>Email</strong><br />
                {booking.email}
              </p>

              <p>
                <strong>Phone</strong><br />
                {booking.phone}
              </p>

              <p>
                <strong>UTR Number</strong><br />
                {booking.utr_number}
              </p>

            </div>

          </div>

          <div>

            <h3 className="font-bold text-lg mb-4">
              Event Details
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Event</strong><br />
                {booking.event_name}
              </p>

              <p>
                <strong>Tickets</strong><br />
                {booking.ticket_count}
              </p>

              <p>
                <strong>Amount</strong><br />
                ₹{booking.total_amount}
              </p>

              <p>
                <strong>Booking Status</strong><br />
                {booking.booking_status}
              </p>

              <p>
                <strong>Payment Status</strong><br />
                {booking.payment_status}
              </p>

            </div>

          </div>

        </div>
                {ticket && (

          <div className="border-t p-6">

            <h3 className="text-xl font-bold mb-6 text-center">
              Generated Ticket
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div className="text-center">

                {ticket.qr_code && (

                  <img
                    src={ticket.qr_code}
                    alt="Ticket QR Code"
                    className="w-64 h-64 mx-auto border rounded-xl shadow"
                  />

                )}

              </div>

              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Ticket Number
                  </p>

                  <p className="font-bold text-lg">
                    {ticket.ticket_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Ticket Status
                  </p>

                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    {ticket.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Created On
                  </p>

                  <p>
                    {new Date(ticket.created_at).toLocaleString()}
                  </p>
                </div>

              </div>

            </div>

          </div>

        )}

        <div className="border-t px-6 py-5 flex justify-end">

          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

};

export default BookingModal;