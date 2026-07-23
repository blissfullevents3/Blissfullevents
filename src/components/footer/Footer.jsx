import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  platformLinks,
  communityLinks,
  helpfulLinks,
} from "../../constants";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-purple-500 pb-10">

          {/* Company */}

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Blissful Events
            </h2>

            <p className="text-purple-100 leading-7">
              We make discovering and booking events simple, secure,
              and memorable. From concerts and festivals to workshops
              and cultural events, Blissful Events helps you experience
              the moments that matter.
            </p>

            <div className="flex gap-4 mt-6">
              {platformLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="border border-white rounded-full p-2 hover:bg-white hover:text-purple-700 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}

          <div className="grid grid-cols-2 gap-8">

            <div>
              <h3 className="font-semibold text-lg mb-4">
                Quick Links
              </h3>

              <ul className="space-y-3">
                {communityLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="hover:text-purple-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-lg mb-4">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin />
                <p>
                  Visakhapatnam, Andhra Pradesh, India
                </p>
              </div>

              <div className="flex gap-3">
                <Mail />
                <p>
                  blissfulevents3@gmail.com
                </p>
              </div>

              <div className="flex gap-3">
                <Phone />
                <p>
                  +91 9177981353
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-purple-100">

          <p>
            © 2026 Blissful Events. All Rights Reserved.
          </p>

          <p>
            Designed & Developed with ❤️ by Blissful Events
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;