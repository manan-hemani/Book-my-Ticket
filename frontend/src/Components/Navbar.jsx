// import React from "react";
import { useState} from "react";
import logo from "../assets/logo.png";

const Navbar = ({ setActivePage, currentUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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
            onClick={toggleNav}
          >
            ☰
          </button>
          <ul
            className={`nav-links list-none gap-2 items-center ${isNavOpen ? "flex flex-row absolute top-12 left-0 w-full bg-white p-2 " : "hidden"} md:flex md:static md:flex-row`}
          >
            <button
              onClick={() => {
                setActivePage("home");
                setIsNavOpen(false);
              }}
              className="hover:text-amber-500 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActivePage("about");
                setIsNavOpen(false);
              }}
              className="hover:text-amber-500 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                setActivePage("events");
                setIsNavOpen(false);
              }}
              className="hover:text-amber-500 cursor-pointer"
            >
              Events
            </button>
            <button
              onClick={() => {
                setActivePage("contact");
                setIsNavOpen(false);
              }}
              className="hover:text-amber-500 cursor-pointer"
            >
              Contact
            </button>
            {currentUser ? (
              <span
                className="ml-auto font-semibold text-amber-600 cursor-pointer"
                onClick={() => {
                  setActivePage("profile");
                  setIsNavOpen(false);
                }}
              >
                Welcome, {currentUser.fullName}
              </span>
            ) : (
              <button
                onClick={() => {
                  setActivePage("auth");
                  setIsNavOpen(false);
                }}
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
