import React from "react";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <FaTicketAlt />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <FaUsers />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">

      <div className="p-6 text-center border-b border-gray-700">

        <h2 className="text-2xl font-bold">
          Blissful Events
        </h2>

        <p className="text-sm text-gray-400">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 mt-6">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition ${
                isActive
                  ? "bg-purple-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="p-6 border-t border-gray-700">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;