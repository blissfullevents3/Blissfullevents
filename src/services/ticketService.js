/**
 * Generate Unique Ticket ID
 * Example: BE-20260725-483921
 */
export const generateTicketId = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(100000 + Math.random() * 900000);

  return `BE-${year}${month}${day}-${random}`;
};

/**
 * Generate QR payload
 * This data will be encoded into the QR Code.
 */
export const generateQrPayload = (booking, ticketId) => {
  return JSON.stringify({
    ticketId,
    bookingId: booking.id,
    customerName: booking.customer_name,
    customerEmail: booking.email,
    phone: booking.phone,
    eventName: booking.event_name,
    ticketCount: booking.ticket_count,
    totalAmount: booking.total_amount,
    generatedAt: new Date().toISOString(),
  });
};