import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Eventspage from "./pages/Eventspage";
import Eventdetails from "./pages/Eventdetails";
import Bookingpage from "./pages/Bookingpage";
import Form from "./pages/Form";

// Admin Pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import EventManagement from "./admin/pages/EventManagement";
import AddEvent from "./admin/pages/AddEvent";
import EditEvent from "./admin/pages/EditEvent";
import Bookings from "./admin/pages/Bookings";
import Customers from "./admin/pages/Customers";
import Settings from "./admin/pages/Settings";

// Protected Route
import ProtectedRoute from "./admin/routes/ProtectedRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/events" element={<Eventspage />} />

        <Route
          path="/event/:id"
          element={<Eventdetails />}
        />

        <Route
          path="/booking/:id"
          element={<Bookingpage />}
        />

        <Route
          path="/form"
          element={<Form />}
        />

        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Protected Admin */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <EventManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/add"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/edit/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;