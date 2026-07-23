import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems } from "../../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const closeNavbar = () => {
    setMobileDrawerOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get Contact page route from navItems
  const contactRoute =
    navItems.find((item) => item.label === "form")?.href || "/form";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-0 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-purple-600" />

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-purple-700">
                Blissful Events
              </h1>

              <p className="text-[10px] md:text-xs tracking-[4px] uppercase text-gray-500">
                Event Planners & Organisers
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-10">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative group text-base md:text-lg text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                <Link
                  to={item.href}
                  onClick={() => {
                    scrollToTop();
                    closeNavbar();
                  }}
                  className="relative inline-block"
                >
                  {item.label}

                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Button */}
          <Link
            to={contactRoute}
            onClick={() => {
              scrollToTop();
              closeNavbar();
            }}
            className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-300 font-medium"
          >
            Plan Your Event
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNavbar}
            className="lg:hidden"
          >
            {mobileDrawerOpen ? (
              <X className="w-8 h-8 text-gray-700" />
            ) : (
              <Menu className="w-8 h-8 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-[75%] bg-white border-r border-gray-300 p-6 transform transition-transform duration-500 lg:hidden ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h5 className="text-base font-semibold uppercase border-b border-gray-300 pb-3">
          Menu
        </h5>

        <ul className="mt-6 space-y-3">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-lg text-gray-800 hover:text-purple-600 transition-colors duration-300"
            >
              <Link
                to={item.href}
                onClick={() => {
                  closeNavbar();
                  scrollToTop();
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className="pt-6">
            <Link
              to={contactRoute}
              onClick={() => {
                closeNavbar();
                scrollToTop();
              }}
              className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-medium transition-all duration-300"
            >
              Plan Your Event
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;