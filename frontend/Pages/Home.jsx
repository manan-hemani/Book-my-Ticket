// import React from 'react'
import Hero from "../src/Components/Hero";
import OfferSection from "../src/Components/OfferSection";
import Testimonials from "../src/Components/Testimonials";

const Home = ({ setActivePage }) => {
  return (
    <>
      <Hero setActivePage={setActivePage} />
      <OfferSection limit={4} setActivePage={setActivePage} />
      <Testimonials />
    </>
  );
};

export default Home;
