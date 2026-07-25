import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send Booking Confirmation Email
 */
export const sendTicketEmail = async ({
  customerName,
  customerEmail,
  eventName,
  eventLocation,
  eventDate,
  eventTime,
  ticketId,
  ticketCount,
  totalAmount,
  qrCodeUrl,
}) => {
  try {
    const templateParams = {
      customer_name: customerName,
      customer_email: customerEmail,
      event_name: eventName,
      event_location: eventLocation,
      event_date: eventDate,
      event_time: eventTime,
      ticket_id: ticketId,
      ticket_count: ticketCount,
      total_amount: totalAmount,
      qr_code_url: qrCodeUrl,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return {
      success: true,
      message: "Email sent successfully.",
      response,
    };
  } catch (error) {
  console.error("EmailJS Full Error:", error);
  console.error("Status:", error.status);
  console.error("Text:", error.text);

  return {
    success: false,
    message: "Failed to send email.",
    error,
  };
}
};