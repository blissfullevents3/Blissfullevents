import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;