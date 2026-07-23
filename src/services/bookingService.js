import { supabase } from "./supabase";

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const approveBooking = async (booking) => {
  // Get current event
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("available_tickets")
    .eq("id", booking.event_id)
    .single();

  if (eventError) throw eventError;

  if (event.available_tickets < booking.ticket_count) {
    throw new Error("Not enough tickets available.");
  }

  // Update booking
  const { error: bookingError } = await supabase
    .from("bookings")
    .update({
      payment_status: "Verified",
      booking_status: "Approved",
    })
    .eq("id", booking.id);

  if (bookingError) throw bookingError;

  // Reduce available tickets
  const { error: eventUpdateError } = await supabase
    .from("events")
    .update({
      available_tickets:
        event.available_tickets - booking.ticket_count,
    })
    .eq("id", booking.event_id);

  if (eventUpdateError) throw eventUpdateError;
};

export const rejectBooking = async (bookingId) => {
  const { error } = await supabase
    .from("bookings")
    .update({
      payment_status: "Rejected",
      booking_status: "Rejected",
    })
    .eq("id", bookingId);

  if (error) throw error;
};