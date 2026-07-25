// import React from "react";
import logo from "../assets/logo.png";

const Navbar = ({ setActivePage, currentUser }) => {
  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-gray-200 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-2 max-w-6xl mx-auto">
          <a
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 font-bold text-gray-800 no-underline cursor-pointer"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-11 h-11 object-cover rounded-lg"
            />
            <span>Book my Ticket</span>
          </a>
          <button
            className="nav-toggle block md:hidden text-xl bg-transparent border-none"
            aria-label="Toggle navigation"
            onclick="toggleNav()"
          >
            ☰
          </button>
          <ul className="nav-links hidden md:flex list-none gap-4 items-center">
            <button
              onClick={() => setActivePage("home")}
              className="hover:text-amber-500 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => setActivePage("about")}
              className="hover:text-amber-500 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => setActivePage("events")}
              className="hover:text-amber-500 cursor-pointer"
            >
              Events
            </button>
            <button
              onClick={() => setActivePage("contact")}
              className="hover:text-amber-500 cursor-pointer"
            >
              Contact
            </button>
            {currentUser ? (
              <span
                className="ml-auto font-semibold text-amber-600 cursor-pointer"
                onClick={() => setActivePage("profile")}
              >
                Welcome, {currentUser.fullName}
              </span>
            ) : (
              <button
                onClick={() => setActivePage("auth")}
                className="ml-auto cursor-pointer hover:text-amber-500"
              >
                Login / Register
              </button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
