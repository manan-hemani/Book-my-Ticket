// import React from "react";

const Hero = ({ setActivePage }) => {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-[60vh] flex flex-col items-center justify-center text-white text-center"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(44,62,80,0.6), rgba(52,73,94,0.4)), url("https://images.pexels.com/photos/19320117/pexels-photo-19320117.jpeg")`,
        }}
      >
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
          Making Every Event Memorable
        </h1>
        <p className="text-lg opacity-90 mb-4">
          Seamless ticketing for concerts, corporate events, weddings and more.
        </p>
        <div className="flex gap-4">
          <a
            onClick={() => setActivePage("events")}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-amber-600"
          >
            View Events
          </a>
          <a
            onClick={() => setActivePage("about")}
            className="border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white cursor-pointer hover:text-amber-600"
          >
            Learn More
          </a>
        </div>
      </div>
      <section className="bg-white py-10 my-2 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Book my Ticket
          </h2>
          <p className="text-gray-500">
            We make event discovery and booking effortless curated events,
            transparent pricing, and reliable organizers. Browse upcoming shows,
            reserve seats, and get instant confirmations.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
