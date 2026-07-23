import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

// =======================
// Navigation
// =======================

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/form" },
];

// =======================
// Social Links
// =======================

export const platformLinks = [
  { href: "#", icon: <Facebook /> },
  { href: "#", icon: <Instagram /> },
  { href: "#", icon: <Twitter /> },
];

// =======================
// Footer Links
// =======================

export const communityLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/events", text: "Events" },
  { href: "/form", text: "Contact Us" },
];

export const helpfulLinks = [
  { href: "/", text: "Privacy Policy" },
  { href: "/", text: "Terms & Conditions" },
  { href: "/", text: "Refund Policy" },
  { href: "/", text: "Support" },
];

// =======================
// Testimonials
// =======================

import profile5 from "../assets/profile/profile5.avif";
import profile7 from "../assets/profile/profile7.avif";
import profile8 from "../assets/profile/profile8.avif";

export const testimonials = [
  {
    name: "Rahul Kumar",
    date: "July 2026",
    comment:
      "Amazing event! Everything was well organized and we had a wonderful experience.",
    photo: profile5,
  },
  {
    name: "Priya Sharma",
    date: "July 2026",
    comment:
      "Very easy booking process and instant confirmation. Highly recommended!",
    photo: profile7,
  },
  {
    name: "Arjun Reddy",
    date: "July 2026",
    comment:
      "Excellent customer support and memorable event experience.",
    photo: profile8,
  },
];