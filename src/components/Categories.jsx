import React from "react";
import { motion } from "framer-motion";
import { FcElectricity } from "react-icons/fc";
import { PiPipeWrench } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { GiPaintRoller } from "react-icons/gi";
import { MdOutlineCarpenter } from "react-icons/md";

// Categories data with description
const categories = [
  {
    title: "Electric",
    icon: FcElectricity,
    color: "bg-yellow-100 text-yellow-500",
    description: "Fast and reliable electrical services for homes and offices.",
  },
  {
    title: "Plumbing",
    icon: PiPipeWrench,
    color: "bg-blue-100 text-blue-500",
    description: "Professional plumbing solutions for all your needs.",
  },
  {
    title: "Home Renovation",
    icon: IoHomeOutline,
    color: "bg-green-100 text-green-500",
    description: "Transform your space with our expert renovation services.",
  },
  {
    title: "Painter",
    icon: GiPaintRoller,
    color: "bg-pink-100 text-pink-500",
    description: "High-quality painting services to beautify your home.",
  },
  {
    title: "Carpenter",
    icon: MdOutlineCarpenter,
    color: "bg-orange-100 text-orange-500",
    description: "Custom carpentry and furniture solutions with precision.",
  },
];

const Categories = () => {
  return (
    <section className=" mx-auto my-12 ">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center text-base-content mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Service Categories
      </motion.h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-start p-6 rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl bg-base-100 dark:bg-base-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icon circle */}
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${cat.color}`}
              >
                <Icon className="text-3xl md:text-4xl" />
              </div>

              {/* Category Title */}
              <h3 className="text-lg md:text-xl font-semibold text-base-content text-center mb-2">
                {cat.title}
              </h3>

              {/* Category Description */}
              <p className="text-sm md:text-base text-center text-base-content/70">
                {cat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
