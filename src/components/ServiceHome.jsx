import React, { useEffect, useState } from "react";
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
        console.log(res.data);
        setServices(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [fetchAxios, setLoading]);

  return (
    <section className="py-10 flex flex-col flex-1">
      <h2 className="md:text-5xl text-2xl font-bold text-center mb-8">
        Our Most Popular Services
      </h2>

      {loading ? (
        <LoadingPage />
      ) : services.length === 0 ? (
        <div className="flex justify-center flex-col gap-5 items-center h-64">
          <h1 className="text-2xl font-semibold text-gray-500 text-center">
            No services found for your sear
          </h1>
        </div>
      ) : (
        <div className="overflow-y-auto md:overflow-y-visible h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link to={"/service"}>
              <button className="md:text-[16px] text-center text-xs btn bg-linear-to-br from-[#632ee3] to-[#6f10f3] text-white hover:opacity-90">
                Show All{" "}
                <span>
                  {" "}
                  <ArrowRight />
                </span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceHome;
