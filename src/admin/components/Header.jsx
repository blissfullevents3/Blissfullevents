import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow flex justify-between items-center px-8 py-5">

      <div>

        <h1 className="text-2xl font-bold">
          Blissful Events
        </h1>

        <p className="text-gray-500">
          Admin Dashboard
        </p>

      </div>

      <div className="flex items-center gap-6">

        <FaBell
          size={22}
          className="cursor-pointer text-gray-600"
        />

        <div className="flex items-center gap-2">

          <FaUserCircle
            size={35}
            className="text-purple-600"
          />

          <div>

            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;