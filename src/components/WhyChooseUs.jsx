import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-base-200 rounded-2xl overflow-hidden">
      <h2 className="text-3xl md:hidden block md:text-4xl font-bold mb-4 text-gray-800 leading-tight text-center">
        Why Choose <span className="text-yellow-400">Our Deals</span>?
      </h2>
      <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-10">
        {/* Left Images */}
        {/* Left Images */}
        <div className="relative flex justify-center md:justify-start min-h-[300px] md:min-h-[380px]">
          {/* First Image */}
          <motion.img
            src="https://i.ibb.co.com/pBYT1v8h/plumbing3.jpg"
            alt="Service 1"
            className="absolute object-cover transform transition-transform duration-300 ease-in-out hover:scale-105
      w-44 h-52 sm:w-52 sm:h-60 md:w-62 md:h-72
      md:left-10 -left-0.5 md:right-52 -bottom-3 md:-bottom-5 z-10
       shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />

          {/* Second Image (Overlapping slightly) */}
          <motion.img
            src="https://i.ibb.co.com/HLBtG76P/plum2.jpg"
            alt="Service 2"
            className="absolute object-cover transform transition-transform duration-300 ease-in-out hover:scale-105
      w-44 h-52 sm:w-52 sm:h-60 md:w-62 md:h-72
      -top-1 left-16  md:left-40 z-20
       shadow-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:block hidden md:text-4xl font-bold mb-4 text-gray-800 leading-tight">
            Why Choose <span className="text-yellow-400">Our Deals</span>?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            We connect you with trusted professionals for your home services —
            from electrical work to plumbing, carpentry, and beyond. Our
            platform ensures transparent pricing, verified experts, and fast
            service. We’re committed to quality and customer satisfaction.
          </p>

          <ul className="mb-6 space-y-2 text-gray-700 text-sm sm:text-base">
            <li>✔ 100% Verified Service Providers</li>
            <li>✔ Transparent & Affordable Pricing</li>
            <li>✔ 24/7 Customer Support</li>
            <li>✔ Fast and Reliable Service</li>
          </ul>

          <button className="btn bg-yellow-400 text-white border-0 hover:bg-yellow-500 transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
