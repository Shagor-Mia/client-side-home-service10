import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";

const UpdateService = ({ service, onUpdated }) => {
  const [showModal, setShowModal] = useState(false);
  const fetchAxios = useAxios();

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
        Swal.fire({
          icon: "success",
          title: "Service Updated",
          text: "The service has been updated successfully!",
        });

        onUpdated(service._id, updatedService);
        setShowModal(false);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the service.",
      });
    }
  };

  return (
    <>
      {/* --- Update Button --- */}
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Update
      </button>

      {/* --- Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
            <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
              Update Service
            </h3>

            <form onSubmit={handleUpdateService} className="space-y-3">
              <div>
                <label className="font-semibold text-gray-700">
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

              <div>
                <label className="font-semibold text-gray-700">Category</label>
                <select
                  name="category"
                  defaultValue={service.category}
                  className="input input-bordered w-full mt-1"
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

              <div>
                <label className="font-semibold text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={service.price}
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={service.description}
                  className="textarea textarea-bordered w-full mt-1 h-28 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={service.image}
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="btn bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateService;
