// import { useEffect, useState } from "react";
// import axios from "axios";

const events = [
  {
    title: "Stand-Up Comedy",
    organizer: "Comedy Central",
    price: "Rs. 1,499",
    img: "https://images.pexels.com/photos/9547593/pexels-photo-9547593.jpeg",
  },
  {
    title: "London Tech Week",
    organizer: "Elegant Affairs",
    price: "Free",
    img: "https://images.pexels.com/photos/38041486/pexels-photo-38041486.jpeg",
  },
  {
    title: "Tech Summit 2026",
    organizer: "TechCorp",
    price: "Rs. 3,999",
    img: "https://images.pexels.com/photos/19451448/pexels-photo-19451448.jpeg",
  },
  {
    title: "Retro Night: 90s Party",
    organizer: "PartyHub",
    price: "Rs. 799",
    img: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
  },
  {
    title: "Summer Beats Festival",
    organizer: "LiveNation",
    price: "Rs. 1,499",
    img: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
  },
  {
    title: "Corporate Gala",
    organizer: "BizWorld",
    price: "Rs. 2,499",
    img: "https://images.pexels.com/photos/19451448/pexels-photo-19451448.jpeg",
  },
];

const OfferSection = ({ limit, setActivePage }) => {
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const response = await axios.get("http://localhost:3000/api/fsevents");
  //     setEvents(response.data);
  //   };
  //   fetchEvents();
  // }, []);

  const displayEvents = limit ? events.slice(0, limit) : events;
  return (
    <>
      <section id="upcoming" className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upcoming Events
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayEvents.map((event, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 transition-transform"
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Organizer: {event.organizer}
                </p>
                <p className="font-bold text-amber-500 mt-auto">
                  {event.price}
                </p>
                <div className="flex gap-2 mt-3 justify-center">
                  <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-100">
                    View Details
                  </button>
                  <button className="bg-amber-500 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-600">
                    Book Tickets
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {limit && (
          <div className="flex justify-center mt-6">
            <a
              onClick={() => setActivePage("events")}
              className="border border-gray-300 px-4 py-2 rounded-md font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-amber-500"
            >
              See All Events
            </a>
          </div>
        )}
      </section>
    </>
  );
};

export default OfferSection;
