import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I book a service?",
    a: "Simply choose a category, select a service provider, and confirm your booking. It only takes a few clicks.",
  },
  {
    q: "Are your service providers verified?",
    a: "Yes. All service providers go through identity verification and skill assessment before joining our platform.",
  },
  {
    q: "Can I cancel or reschedule a booking?",
    a: "Absolutely. You can cancel or reschedule from your dashboard before the service time without any hassle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept secure online payments including cards, mobile banking, and cash on service completion.",
  },
  {
    q: "Is customer support available?",
    a: "Yes, our support team is available 24/7 to assist you with any issues or questions.",
  },
];

const FAQ = () => {
  return (
    <section className=" mx-auto  px-4 ">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-base-content mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            className="collapse collapse-arrow bg-base-100 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              {item.q}
            </div>
            <div className="collapse-content text-base-content/70">
              <p>{item.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
