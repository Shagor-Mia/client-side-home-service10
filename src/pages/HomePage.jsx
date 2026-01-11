import React from "react";
import Hero from "../components/Hero";
import ServiceHome from "../components/ServiceHome";
import WhyChooseUs from "../components/WhyChooseUs";
import Statistics from "../components/Statistics";
import Categories from "../components/Categories";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

const HomePage = () => {
  return (
    <div className="flex flex-col md:gap-20">
      <Hero />
      <Categories />
      <ServiceHome />
      <WhyChooseUs />
      <Statistics />
      <FAQ />
      <CTA />
    </div>
  );
};

export default HomePage;
