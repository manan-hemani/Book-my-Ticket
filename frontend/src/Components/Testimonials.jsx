// import React from "react";

const testimonials = [
  {
    text: "EventPlus made our movie premiere unforgettable — flawless execution.",
    author: "Priya & Arjun",
  },
  {
    text: "Easy booking, clear pricing, and great customer support.",
    author: "TechCorp Events",
  },
  {
    text: "Booked concert tickets in seconds. Highly recommended.",
    author: "Rohit S.",
  },
];

const Testimonials = () => {
  return (
    <>
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          What Our Clients Say
        </h2>
        <div className="flex flex-col gap-4 mt-4">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 italic text-gray-800"
            >
              <p>"{t.text}"</p>
              <cite className="block mt-3 not-italic text-gray-500 font-semibold">
                — {t.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
