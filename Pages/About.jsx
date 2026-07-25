// import React from 'react'

import Milestones from "../src/Components/Milestones";
import MissionVisionValues from "../src/Components/MissionVisionValues";
import TeamMembers from "../src/Components/TeamMembers";

const About = () => {
  return (
    <>
      <div className="bg-white py-10 text-center min-h-[30vh] flex flex-col justify-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            About Book my Ticket
          </h1>
          <p className="text-gray-500">
            We connect people to memorable experiences — trusted organizers,
            transparent pricing, and a simple booking flow.
          </p>
        </div>
      </div>
      <Milestones />
      <MissionVisionValues />
      <TeamMembers />
    </>
  );
};

export default About;
