// import React from 'react'

const team = [
  { name: "MNO", role: "Founder & CEO" },
  { name: "ABC", role: "Head of Operations" },
  { name: "XYZ", role: "Marketing Lead" },
];

const TeamMembers = () => {
  return (
    <>
      <section className="py-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Meet the Team
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <img
                src="https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png"
                alt={member.name}
                className="mx-auto h-40 object-cover rounded-lg mb-3"
              />
              <h4 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TeamMembers;
