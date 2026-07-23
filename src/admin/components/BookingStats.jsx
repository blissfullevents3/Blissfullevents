import React from "react";
import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const BookingStats = ({ bookings = [] }) => {
  const total = bookings.length;

  const pending = bookings.filter(
    (b) => b.booking_status === "Pending"
  ).length;

  const approved = bookings.filter(
    (b) => b.booking_status === "Approved"
  ).length;

  const rejected = bookings.filter(
    (b) => b.booking_status === "Rejected"
  ).length;

  const revenue = bookings
    .filter((b) => b.booking_status === "Approved")
    .reduce((sum, b) => sum + Number(b.total_amount || 0), 0);

  const cards = [
    {
      title: "Total Bookings",
      value: total,
      icon: <FaUsers className="text-3xl" />,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock className="text-3xl" />,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
    {
      title: "Approved",
      value: approved,
      icon: <FaCheckCircle className="text-3xl" />,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <FaTimesCircle className="text-3xl" />,
      bg: "bg-red-100",
      text: "text-red-700",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.bg} ${card.text} p-4 rounded-full`}
            >
              {card.icon}
            </div>
          </div>
        ))}

      </div>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">

        <h3 className="text-lg font-semibold mb-2">
          Total Revenue
        </h3>

        <p className="text-4xl font-bold text-green-600">
          ₹ {revenue.toLocaleString()}
        </p>

      </div>
    </>
  );
};

export default BookingStats;