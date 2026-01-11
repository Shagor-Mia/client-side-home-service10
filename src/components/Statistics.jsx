import React from "react";
import { motion } from "framer-motion";
import { FcElectricity } from "react-icons/fc";
import { PiPipeWrench } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { GiPaintRoller } from "react-icons/gi";
import { MdOutlineCarpenter } from "react-icons/md";

// Sample statistics data
const statsData = [
  { title: "Electric", count: 120, icon: FcElectricity },
  { title: "Plumbing", count: 85, icon: PiPipeWrench },
  { title: "Home Renovation", count: 60, icon: IoHomeOutline },
  { title: "Painter", count: 40, icon: GiPaintRoller },
  { title: "Carpenter", count: 30, icon: MdOutlineCarpenter },
];

const totalServices = statsData.reduce((acc, item) => acc + item.count, 0);

const Statistics = () => {
  return (
    <section className="mx-auto my-12 ">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center text-base-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services Statistics
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statsData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-base-100 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">
              <item.icon /> {/* Render icon correctly */}
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              {item.title}
            </h3>
            <p className="md:text-3xl font-bold text-base-500">{item.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Total Services */}
      <motion.div
        className="mt-10 text-center bg-primary/10 dark:bg-primary/20 text-base-500 rounded-xl md:py-10 py-4 px-6 font-bold md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Total Services Provided: {totalServices}+
      </motion.div>
    </section>
  );
};

export default Statistics;
