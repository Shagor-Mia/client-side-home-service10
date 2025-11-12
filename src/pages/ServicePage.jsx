import React, { useContext, useEffect, useState } from "react";
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
  };

  return (
    <section className="mx-auto py-10 flex flex-col flex-1">
      <h2 className="md:text-5xl text-2xl font-bold text-center mb-8">
        Our All Best Services
      </h2>
      <div className="flex justify-between">
        <SearchService onSearch={handleSearchResults} />

        <FilterByPrice onFilter={handleFilter} />
      </div>

      {loading ? (
        <LoadingPage />
      ) : services.length === 0 ? (
        <div className="flex justify-center flex-col gap-5 items-center h-64">
          <h1 className="text-2xl font-semibold text-gray-500 text-center">
            {searchActive
              ? "No services found for your search."
              : "No services available in this price range."}
          </h1>
          <div>
            <button
              onClick={() => window.location.reload()}
              className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0"
            >
              All Services
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto md:overflow-y-visible h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicePage;
