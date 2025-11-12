import React, { useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext";
import ServiceCard from "../components/ServiceCard";
import SortByServiceList from "../components/SortByPrice";

const ServicePage = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const fetchAxios = useAxios();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        let endpoint = "/service/all";
        if (sortOrder === "price_asc")
          endpoint = "/service/sort?sort=price_asc";
        else if (sortOrder === "price_desc")
          endpoint = "/service/sort?sort=price_desc";

        const res = await fetchAxios.get(endpoint);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [fetchAxios, sortOrder, setLoading]);

  return (
    <section className="mx-auto py-10 flex flex-col flex-1">
      <h2 className="md:text-5xl text-2xl font-bold text-center mb-8">
        Our All Best Services
      </h2>

      {/* Sort Dropdown */}
      <SortByServiceList sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
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
