import React from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  // Calculate average rating + number of reviews
  const reviews = service.reviews || [];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1
        )
      : "N/A";

  return (
    <div className="card bg-base-100 shadow-sm md:hover:scale-102 md:transform md:transition-transform md:duration-300 md:ease-in-out rounded-xl overflow-hidden  dark:border-gray-800">
      {/* Image */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold truncate">
          {service.serviceName}
        </h3>

        {/* Description (short preview) */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {service.description}
        </p>

        {/* Rating + Price */}
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-1 text-yellow-500">
            <FaStar className="pb-0.5" />
            <span className="text-gray-700 dark:text-gray-300">
              {averageRating}{" "}
              <span className="text-xs text-gray-400">
                ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
              </span>
            </span>
          </span>
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            ${service.price}
          </span>
        </div>

        {/* Details Button */}
        <Link
          to={`/service/${service._id}`}
          className="btn w-full bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 border-0 mt-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
