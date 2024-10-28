import React from "react";
import Logo from "../Data/main_logo.png";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CiFacebook, CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-clr4 backdrop-blur-lg border-t border-gray-700/50 shadow-lg py-8">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-4">
            <img
              src={Logo}
              alt="Coding Verse Logo"
              className="h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 mr-3"
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
              SnapMovies.pk
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
          Discover movies and series, from new releases to classics, and request your favorites through our social media.
          </p>
        </div>

        {/* Social Icons and Contact */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex space-x-6 mb-4">
            <a
              href="/"
              aria-label="Instagram"
              className="text-black hover:text-red-500 transition duration-300 ease-in-out"
            >
              <FaInstagram className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="/"
              aria-label="Facebook"
              className="text-black hover:text-blue-600 transition duration-300 ease-in-out"
            >
              <CiFacebook className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="/"
              aria-label="WhatsApp"
              className="text-black hover:text-green-500 transition duration-300 ease-in-out"
            >
              <FaWhatsapp className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="/"
              aria-label="LinkedIn"
              className="text-black hover:text-blue-700 transition duration-300 ease-in-out"
            >
              <CiLinkedin className="text-2xl sm:text-3xl" />
            </a>
          </div>
          <p className="text-sm sm:text-base text-gray-900">
            <i className="fas fa-map-marker-alt"></i> Check Our Social Media Accounts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
