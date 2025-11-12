import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-10 bg-base-100 rounded-2xl">
      <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-10">
        {/* Left Images */}
        <div className="relative flex justify-center">
          {/* First Image */}
          <img
            src="https://i.ibb.co.com/pBYT1v8h/plumbing3.jpg"
            alt="Service 1"
            className="w-64 h-72 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105 absolute right-60 -bottom-30 z-10"
          />

          {/* Second Image (Overlapping) */}
          <img
            src="https://i.ibb.co.com/HLBtG76P/plum2.jpg"
            alt="Service 2"
            className="w-64 h-72 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105  absolute -top-30 left-50 z-10 "
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Why Choose <span className="text-yellow-400">Our Deals</span>?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We connect you with trusted professionals for your home services —
            from electrical work to plumbing, carpentry, and beyond. Our
            platform ensures transparent pricing, verified experts, and fast
            service. We’re committed to quality and customer satisfaction.
          </p>

          <ul className="mb-6 space-y-2 text-gray-700">
            <li>✔ 100% Verified Service Providers</li>
            <li>✔ Transparent & Affordable Pricing</li>
            <li>✔ 24/7 Customer Support</li>
            <li>✔ Fast and Reliable Service</li>
          </ul>

          <button className="btn #f3df62 bg-yellow-400 text-white border-0 hover:opacity-90">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
