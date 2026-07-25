// import React from 'react'

const cards = [
  {
    title: "Mission",
    text: "Deliver effortless event discovery and reliable booking for everyone.",
  },
  {
    title: "Vision",
    text: "Be the most trusted platform for live experiences across India.",
  },
  {
    title: "Values",
    text: "Transparency, reliability, and customer-first service.",
  },
];

const MissionVisionValues = () => {
  return (
    <>
      <section className="py-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Our Mission, Vision & Values
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {c.title}
              </h3>
              <p className="text-gray-500">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MissionVisionValues;
