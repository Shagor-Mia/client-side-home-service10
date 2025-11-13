import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAxios } from "../hooks/useAxios";
import ServiceCard from "./ServiceCard";
import LoadingPage from "../pages/LoadingPage";
import { Link } from "react-router";

const ServiceHome = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const fetchAxios = useAxios();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetchAxios.get("/service/all");
        setServices(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [fetchAxios, setLoading]);

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="py-10 flex flex-col flex-1"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:text-5xl text-2xl font-bold text-center mb-8"
      >
        Our Most Popular Services
      </motion.h2>

      {/* Animate Presence for Loading / Cards */}
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" />
        ) : services.length === 0 ? (
          <motion.div
            key="no-services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center flex-col gap-5 items-center h-64"
          >
            <h1 className="text-2xl font-semibold text-gray-500 text-center">
              No services found.
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="service-list"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-y-auto md:overflow-y-visible h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
          >
            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
              {services.map((service) => (
                <motion.div key={service._id} variants={cardVariants}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center mt-10"
            >
              <Link to={"/service"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="md:text-[16px] text-xs btn bg-linear-to-br from-[#632ee3] to-[#6f10f3] text-white hover:opacity-90"
                >
                  Show All{" "}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ArrowRight className="inline ml-1" />
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ServiceHome;
