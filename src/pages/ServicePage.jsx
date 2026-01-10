import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAxios } from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext";
import ServiceCard from "../components/ServiceCard";
import FilterByPrice from "../components/FilterByPrice";
import SearchService from "../components/SearchService";
import LoadingPage from "../pages/LoadingPage";

const ServicePage = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [animateKey, setAnimateKey] = useState(0); // used to trigger re-animation
  const fetchAxios = useAxios();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let endpoint = "/service/all";
        if (priceFilter.min || priceFilter.max) {
          endpoint = `/service/price?`;
          if (priceFilter.min) endpoint += `minPrice=${priceFilter.min}&`;
          if (priceFilter.max) endpoint += `maxPrice=${priceFilter.max}`;
        }

        const res = await fetchAxios.get(endpoint);
        setServices(res.data);
        setAnimateKey((prev) => prev + 1); // re-trigger animation on update
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [fetchAxios, priceFilter, setLoading]);

  const handleFilter = (min, max) => {
    setPriceFilter({ min, max });
  };

  const handleSearchResults = (results) => {
    setSearchActive(true);
    setServices(results || []);
    setAnimateKey((prev) => prev + 1);
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="mx-auto flex flex-col flex-1"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:text-5xl text-2xl font-bold text-center md:mb-8"
      >
        Our All Best Services
      </motion.h2>

      {/* Search + Filter Controls */}
      <motion.div
        variants={controlsVariants}
        initial="hidden"
        animate="visible"
        className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between py-10"
      >
        <SearchService onSearch={handleSearchResults} />
        <FilterByPrice onFilter={handleFilter} />
      </motion.div>

      {/* Services Section */}
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" />
        ) : services.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center flex-col gap-5 items-center h-64"
          >
            <h1 className="text-2xl font-semibold text-gray-500 text-center">
              {searchActive
                ? "No services found for your search."
                : "No services available in this price range."}
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="btn  text-white border-0"
            >
              All Services
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={animateKey} // triggers re-animation when search/filter changes
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-y-auto md:overflow-y-visible h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
              {services.map((service) => (
                <motion.div key={service._id} variants={cardVariants}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ServicePage;
