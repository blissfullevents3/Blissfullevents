import React from "react";
import Hero1 from "../components/home/Hero1";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Events from "../components/events/Events";
import Counters from "../components/counter/Counters";
import Testimonial from "../components/testimonial/Testimonial";


const Home = () => {
  return (
    <>
      <Hero1 />
      <Counters />
      <WhyChooseUs/>
      <Events />
      {/* <Testimonial /> */}
    </>
  );
};

export default Home;
