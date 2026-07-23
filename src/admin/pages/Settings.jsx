import React from "react";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PageHeader from "../components/PageHeader";
import { toast } from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    organization: "Blissful Events",
    adminName: "Administrator",
    email: "admin@blissfulevents.com",
    phone: "+91 9876543210",
    address: "Visakhapatnam, Andhra Pradesh",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Later save to Supabase

    toast.success("Settings Saved Successfully");
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="Settings"
        subtitle="Manage Application Settings"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="font-semibold">
              Organization Name
            </label>

            <input
              type="text"
              name="organization"
              value={settings.organization}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Admin Name
            </label>

            <input
              type="text"
              name="adminName"
              value={settings.adminName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">
              Office Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Currency
            </label>

            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="INR">Indian Rupee (INR)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Time Zone
            </label>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

              <option value="Europe/London">
                Europe/London
              </option>

              <option value="America/New_York">
                America/New_York
              </option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
            >
              Save Settings
            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
};

export default Settings;