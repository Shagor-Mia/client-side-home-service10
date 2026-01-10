import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";

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
    setTimeout(() => modalRef.current?.close(), 200); // Wait for animation
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
              <h3 className="font-bold text-2xl text-center mb-4">
                Update Service
              </h3>

              <form onSubmit={handleUpdateService} className="space-y-3">
                {/* Service Name */}
                <div>
                  <label className="font-semibold">Service Name</label>
                  <input
                    type="text"
                    name="serviceName"
                    defaultValue={service.serviceName}
                    className="input input-bordered w-full mt-1 bg-base-100 text-base-content border-base-300 dark:border-base-700"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="font-semibold">Category</label>
                  <select
                    name="category"
                    defaultValue={service.category}
                    className="select select-bordered w-full mt-1 bg-base-100 text-base-content border-base-300 dark:border-base-700"
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
                  <label className="font-semibold">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={service.price}
                    className="input input-bordered w-full mt-1 bg-base-100 text-base-content border-base-300 dark:border-base-700"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-semibold">Description</label>
                  <textarea
                    name="description"
                    defaultValue={service.description}
                    className="textarea textarea-bordered w-full mt-1 h-28 resize-none bg-base-100 text-base-content border-base-300 dark:border-base-700"
                    required
                  ></textarea>
                </div>

                {/* Image */}
                <div>
                  <label className="font-semibold">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={service.image}
                    className="input input-bordered w-full mt-1 bg-base-100 text-base-content border-base-300 dark:border-base-700"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn gray hover:bg-gray-600 hover:text-gray-100 text-white border-0 hover:scale-102"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-ghost"
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
