import React, { useRef, useState, useContext } from "react";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

const ReviewModal = ({ serviceId, serviceName }) => {
  const { user } = useContext(AuthContext);
  const fetchSecureAxios = useAxiosSecure();
  const modalRef = useRef(null);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // Open modal
  const openModal = () => {
    if (!user) {
      Swal.fire(
        "Login Required",
        "Please log in to leave a review.",
        "warning"
      );
      return;
    }
    if (modalRef.current) modalRef.current.showModal();
  };

  // Close modal
  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchSecureAxios
        .post(`/bookings/review/${serviceId}`, {
          rating,
          comment,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        closeModal(); // hide modal before showing alert
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setRating("");
        setComment("");
      } else {
        Swal.fire("Error", "Failed to add your review.", "error");
      }
    } catch (err) {
      closeModal();
      Swal.fire(
        "Error",
        err.response?.data?.message ||
          "Something went wrong while submitting review.",
        "error"
      );
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0 mt-5"
      >
        Leave a Review
      </button>

      {/* Review Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-purple-700">
            Leave a Review for{" "}
            <span className="text-black">:{serviceName}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Rating */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Rating (1–5)
              </label>
              <select
                className="select select-bordered w-full"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            {/* Comment */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Comment
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="btn bg-purple-600 hover:bg-purple-700 text-white"
              >
                Submit Review
              </button>
              <button
                type="button"
                className="btn bg-gray-300 hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ReviewModal;
