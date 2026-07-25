// import React from 'react'

const milestones = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Events Hosted" },
  { value: "4.8", label: "Average Rating" },
];

const Milestones = () => {
  return (
    <>
      <div className="bg-white max-w-4xl mx-auto mt-8 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Milestones</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <strong className="text-2xl text-amber-500">{m.value}</strong>
              <span className="text-gray-600">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Milestones;
