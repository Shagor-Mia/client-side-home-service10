import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa6";
import { useAxios } from "../hooks/useAxios";
import LoadingPage from "../pages/LoadingPage";
import { AuthContext } from "../context/AuthContext";
import BookingModal from "./BookingModal";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const fetchAxios = useAxios();

  useEffect(() => {
    fetchAxios.get(`/service/${id}`).then((res) => {
      console.log(res.data);
      setService(res.data);
      setLoading(false);
    });
  }, [id, fetchAxios, setLoading]);

  if (loading || !service) return <LoadingPage />;
  // Extract data
  const {
    serviceName,
    category,
    description,
    image,
    price,
    providerEmail,
    providerName,
    reviews = [],
  } = service;

  // Calculate average rating
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1
        )
      : "N/A";

  return (
    <div className="overflow-y-auto md:overflow-y-visible h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
      <div className="flex md:gap-20 gap-0 flex-col md:flex-row">
        {/* Left: Image + Info */}
        <div className="mt-5 md:mx-0 mx-3 space-y-4">
          {/* Image */}
          <img
            className="md:w-[500px] rounded-2xl"
            src={image}
            alt={serviceName}
          />

          {/* Category, Price, Rating */}
          <div className="md:flex justify-between md:w-[500px] px-2">
            <p>
              Category:
              <span className="text-gray-700 font-semibold"> {category}</span>
            </p>
            <p>
              Price:
              <span className="text-gray-700 font-semibold"> ${price}</span>
            </p>
            <p className="flex items-center text-gray-700 font-semibold gap-1">
              <FaStar className="text-yellow-500" />
              {averageRating}{" "}
              <span className="text-sm text-gray-400">
                ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
              </span>
            </p>
          </div>

          {/* Provider */}
          <div className="md:flex justify-between md:w-[500px] px-2">
            <p>
              Provider Email:
              <span className="text-gray-700 font-semibold">
                {" "}
                {providerEmail}
              </span>
            </p>
            <p>
              Provider Name:
              <span className="text-gray-700 font-semibold">
                {" "}
                {providerName ? providerName : ""}
              </span>
            </p>
          </div>

          <div>
            <BookingModal user={user} service={service} />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-700 mt-4">
              Description
            </h3>
            <p className="md:w-[500px] text-gray-500">{description}</p>
          </div>
        </div>

        {/* Right: Reviews Section */}
        <div className="mt-5 md:mt-10 mx-3 md:mx-0 md:w-[500px]">
          <h3 className="text-2xl font-semibold mb-3 text-gray-700">
            Customer Reviews
          </h3>

          {totalReviews > 0 ? (
            <div className="space-y-3">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {rev.userEmail}
                  </p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{rev.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
