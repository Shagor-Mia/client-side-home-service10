import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";
import { useState } from "react";

const UpdateService = ({ service, onUpdated }) => {
  const modalRef = useRef(null);
  const fetchAxios = useAxios();
  const [isOpen, setIsOpen] = useState(false);

  // Open / Close modal
  const openModal = () => {
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => modalRef.current?.close(), 200); // Wait for animation to finish
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedService = {
      serviceName: form.serviceName.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const res = await fetchAxios.patch(
        `/service/${service._id}`,
        updatedService
      );

      if (res.data.modifiedCount > 0) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Service Updated!",
          text: "Your service details have been successfully updated.",
        });
        onUpdated(service._id, updatedService);
      }
    } catch (err) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.message || "Something went wrong while updating.",
      });
    }
  };

  return (
    <>
      {/* --- Trigger Button --- */}
      <button
        onClick={openModal}
        className="btn btn-sm md:ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Update
      </button>

      {/* --- DaisyUI Modal --- */}
      <dialog ref={modalRef} className="modal modal-middle">
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
              <h3 className="font-bold text-2xl text-center text-purple-700 mb-4">
                Update Service
              </h3>

              <form onSubmit={handleUpdateService} className="space-y-3">
                {/* Service Name */}
                <div>
                  <label className="font-semibold text-base-content">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    defaultValue={service.serviceName}
                    className="input input-bordered w-full mt-1"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="font-semibold text-base-content">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={service.category}
                    className="select select-bordered w-full mt-1"
                    required
                  >
                    <option value="Electrician">Electrician</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Home Renovation">Home Renovation</option>
                    <option value="Flooring">Flooring</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Painting">Painting</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="font-semibold text-base-content">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={service.price}
                    className="input input-bordered w-full mt-1"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-semibold text-base-content">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={service.description}
                    className="textarea textarea-bordered w-full mt-1 h-28 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Image */}
                <div>
                  <label className="font-semibold text-base-content">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={service.image}
                    className="input input-bordered w-full mt-1"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn bg-gray-300 hover:bg-gray-400"
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

export default UpdateService;
