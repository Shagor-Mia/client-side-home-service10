import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      className="bg-base-100 shadow-sm rounded-xl p-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
        {review.userEmail}
      </p>
      <div className="flex items-center text-yellow-500 text-sm">
        {Array.from({ length: review.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-1">{review.comment}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default ReviewCard;
