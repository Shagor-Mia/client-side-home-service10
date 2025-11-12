import React, { useRef, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

const ReviewModal = ({ serviceId, serviceName, onReviewAdded }) => {
  const { user } = useContext(AuthContext);
  const fetchSecureAxios = useAxiosSecure();
  const modalRef = useRef(null);

  // console.log(user.email);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const email = user.email;

  const openModal = () => {
    if (!user) {
      Swal.fire(
        "Login Required",
        "Please log in to leave a review.",
        "warning"
      );
      return;
    }
    modalRef.current?.showModal();
  };

  const closeModal = () => modalRef.current?.close();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) return;

    try {
      const newReviewPayload = { rating, comment, email };
      const res = await fetchSecureAxios.post(
        `/bookings/review/${serviceId}`,
        newReviewPayload
      );
      console.log("reviews", res.data);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Review Added",
          text: `Thanks for reviewing "${serviceName}"!`,
        });

        closeModal();
        setRating("");
        setComment("");

        // Append the review to the list instantly
        onReviewAdded?.({
          ...res.data.review,
          createdAt: new Date(res.data.review.createdAt),
        });
      }
    } catch (err) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Could not add review.",
      });
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0 mt-5"
      >
        Leave a Review
      </button>

      <dialog ref={modalRef} className="modal modal-middle">
        <div
          className="modal-box w-[95%] sm:w-[90%] md:w-[500px] max-w-full rounded-2xl p-5 md:p-6 
                     bg-white text-gray-800 shadow-lg"
        >
          <h3 className="font-bold text-lg text-purple-700">
            Leave a Review for <span className="text-black">{serviceName}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
