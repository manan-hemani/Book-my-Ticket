// import React, { useState } from "react";
import { useState } from "react";
import UpcomingEvents from "../src/Components/OfferSection";

const Events = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <section id="events" className="page py-10 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 ">All Events</h1>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="" disabled>
              All Categories
            </option>
            <option value="Stand-Up & Comedy">Stand-Up & Comedy</option>
            <option value="Sports Event">Sports Event</option>
            <option value="Movies & Premiers">Movies & Premiers</option>
            <option value="Concert & Live Music">Concert & Live Music</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Party">Party</option>
          </select>
        </div>
      </div>
      <UpcomingEvents search={search} category={category} />
    </section>
  );
};

export default Events;
