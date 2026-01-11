import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="relative my-10">
      <div className=" mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Need a Trusted Home Service?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Book verified professionals for electrical, plumbing, renovation,
          painting, and more — all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/service"
            className="btn bg-white text-primary hover:bg-white/90 border-0 px-8"
          >
            Book a Service
          </Link>

          <Link
            to="/login"
            className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-8"
          >
            Become a Provider
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
