import React, { useRef } from "react";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";

const BookingModal = ({ user, service }) => {
  const fetchAxios = useAxios();
  const modalRef = useRef(null); //  create modal reference

  if (!service || !user) return null;
  const { _id, serviceName, price } = service;

  //  open modal
  const openModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  //  close modal
  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
  };

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
      console.log("booked data", res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: `Your booking for "${serviceName}" has been confirmed.`,
        });
        closeModal();
        e.target.reset();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong while booking this service.",
      });
      closeModal();
      e.target.reset();
    }
  };

  return (
    <>
      {/*Trigger Button */}
      <button
        className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white border-0"
        onClick={openModal}
      >
        Book Now
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book Service: {serviceName}</h3>
          <form onSubmit={handleBookingSubmit} className="space-y-3 mt-4">
            <div>
              <label className="font-semibold text-gray-700">Your Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Booking Date
              </label>
              <input
                type="date"
                name="bookingDate"
                required
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Price</label>
              <input
                type="text"
                value={`$${price}`}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="btn bg-purple-600 hover:bg-purple-700 text-white"
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
        </div>
      </dialog>
    </>
  );
};

export default BookingModal;
