import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";

const BookingModal = ({ user, service }) => {
  const fetchAxios = useAxios();
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!service || !user) return null;
  const { _id, serviceName, price } = service;

  // --- Open / Close modal ---
  const openModal = () => {
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => modalRef.current?.close(), 200);
  };

  // --- Handle booking form submission ---
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const bookingData = {
      userEmail: user.email,
      serviceId: _id,
      bookingDate: form.bookingDate.value,
      price: price,
    };

    try {
      const res = await fetchAxios.post("/bookings", bookingData);
      if (res.data.insertedId) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: `Your booking for "${serviceName}" has been confirmed.`,
        });
        e.target.reset();
      }
    } catch (err) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong while booking this service.",
      });
      e.target.reset();
    }
  };

  return (
    <>
      {/* --- Trigger Button --- */}
      <button
        className="btn gray hover:bg-gray-600 hover:text-gray-100  hover:scale-102 text-white border-0"
        onClick={openModal}
      >
        Book Now
      </button>

      {/* --- Animated DaisyUI Modal --- */}
      <dialog ref={modalRef} className="modal modal-middle ">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="modal-box relative bg-base-100 text-base-content md:rounded-2xl rounded-xl shadow-2xl"
            >
              <h3 className="font-bold text-2xl text-center text-bas-700 mb-4">
                Book Service
              </h3>

              <form onSubmit={handleBookingSubmit} className="space-y-3 mt-4">
                {/* Email */}
                <div>
                  <label className="font-semibold ">Your Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full mt-1  text-base-content cursor-not-allowed"
                  />
                </div>

                {/* Booking Date */}
                <div>
                  <label className="font-semibold ">Booking Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    required
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="font-semibold ">Price</label>
                  <input
                    type="text"
                    value={`$${price}`}
                    readOnly
                    className="input input-bordered w-full mt-1   text-base-content cursor-not-allowed"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn gray hover:bg-gray-700 text-white"
                  >
                    Confirm Booking
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
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
};

export default BookingModal;
