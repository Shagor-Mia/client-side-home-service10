import React from "react";
import Hero from "../components/Hero";
import ServiceHome from "../components/ServiceHome";
import WhyChooseUs from "../components/WhyChooseUs";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <ServiceHome />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
