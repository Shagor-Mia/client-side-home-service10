import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { useAxios } from "../hooks/useAxios";
import LoadingPage from "../pages/LoadingPage";
import { AuthContext } from "../context/AuthContext";
import BookingModal from "./BookingModal";
import ReviewModal from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import ErrorPage from "../pages/ErrorPage";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const fetchAxios = useAxios();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetchAxios.get(`/service/${id}`);
        if (res.data) {
          setService(res.data);
          setReviews(res.data.reviews || []);
        } else {
          setService(null); // No data found for this ID
        }
      } catch (err) {
        setService(null); // API error → treat as not found
      } finally {
        setLoading(false); // Stop loading in all cases
      }
    };
    fetchService();
  }, [id, fetchAxios]);

  if (loading) return <LoadingPage />;

  if (!service) {
    return <ErrorPage />;
  }
  //  If not found → show ErrorPage

  const {
    serviceName,
    category,
    description,
    image,
    price,
    providerEmail,
    providerName,
  } = service;

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1
        )
      : "N/A";

  //  Called when a new review is successfully submitted
  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]); // instantly show new review
  };

  return (
    <motion.div
      className="overflow-y-auto md:overflow-y-0 h-[500px] md:h-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex md:gap-20 gap-0 flex-col md:flex-row">
        {/* LEFT: Service Image and Info */}
        <motion.div
          className="mt-5 md:mx-0 mx-3 space-y-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image */}
          <motion.img
            src={image}
            alt={serviceName}
            className="md:w-[500px] rounded-2xl shadow-md"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 150 }}
          />

          {/* Category, Price, Rating */}
          <motion.div
            className="md:flex justify-between md:w-[500px] px-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p>
              Category:
              <span className="text-base-content font-semibold">
                {" "}
                {category}
              </span>
            </p>
            <p>
              Price:
              <span className="text-base-content font-semibold"> ${price}</span>
            </p>
            <p className="flex items-center text-base-content font-semibold gap-1">
              <FaStar className="text-yellow-500" />
              {averageRating}{" "}
              <span className="text-sm text-gray-400">
                ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
              </span>
            </p>
          </motion.div>

          {/* Provider Info */}
          <motion.div
            className="md:flex justify-between md:w-[500px] px-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>
              Provider Email:
              <span className="text-base-content font-semibold">
                {" "}
                {providerEmail}
              </span>
            </p>
            <p>
              Provider Name:
              <span className="text-base-content font-semibold">
                {" "}
                {providerName || ""}
              </span>
            </p>
          </motion.div>

          {/* Booking Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <BookingModal user={user} service={service} />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-base-content mt-4">
              Description
            </h3>
            <p className="md:w-[500px] text-base-content">{description}</p>
          </motion.div>
        </motion.div>

        {/* RIGHT: Reviews Section */}
        <motion.div
          className="mt-5 md:mt-10 mx-3 md:mx-0 md:w-[500px]"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-3 text-base-content">
            Customer Reviews
          </h3>

          {totalReviews > 0 ? (
            <motion.div
              className="space-y-3 overflow-y-auto h-[200px] md:h-[300px] pr-2 
                 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {reviews.map((rev, idx) => (
                <ReviewCard key={idx} review={rev} />
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base-content italic"
            >
              No reviews yet.
            </motion.p>
          )}

          {/* Always show the ReviewModal button below reviews */}
          <ReviewModal
            serviceId={service._id}
            serviceName={service.serviceName}
            onReviewAdded={handleReviewAdded}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;
