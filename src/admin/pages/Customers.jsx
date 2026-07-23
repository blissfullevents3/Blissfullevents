import React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import { toast } from "react-hot-toast";

import {
  FaSearch,
  FaSyncAlt,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredCustomers(filtered);
  }, [search, customers]);

  const fetchCustomers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setCustomers(data);
      setFilteredCustomers(data);
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="Customers"
        subtitle="Manage Registered Customers"
      />

      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Top Bar */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

          <div className="relative">

            <FaSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-10 py-3 w-72"
            />

          </div>

          <button
            onClick={fetchCustomers}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700"
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>

        {loading ? (

          <div className="text-center py-10">
            Loading Customers...
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Email
                  </th>

                  <th className="p-3 text-left">
                    Phone
                  </th>

                  <th className="p-3 text-left">
                    City
                  </th>

                  <th className="p-3 text-left">
                    Total Bookings
                  </th>

                  <th className="p-3 text-left">
                    Total Spent
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCustomers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10"
                    >
                      No Customers Found
                    </td>

                  </tr>

                ) : (

                  filteredCustomers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">

                        <div className="flex items-center gap-3">

                          <FaUserCircle
                            size={35}
                            className="text-purple-600"
                          />

                          <span className="font-medium">
                            {customer.name}
                          </span>

                        </div>

                      </td>

                      <td className="p-3">

                        <div className="flex items-center gap-2">

                          <FaEnvelope
                            className="text-gray-500"
                          />

                          {customer.email}

                        </div>

                      </td>

                      <td className="p-3">

                        <div className="flex items-center gap-2">

                          <FaPhone
                            className="text-gray-500"
                          />

                          {customer.phone}

                        </div>

                      </td>

                      <td className="p-3">
                        {customer.city}
                      </td>

                      <td className="p-3">
                        {customer.total_bookings}
                      </td>

                      <td className="p-3 font-semibold text-green-600">
                        ₹{customer.total_spent}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default Customers;