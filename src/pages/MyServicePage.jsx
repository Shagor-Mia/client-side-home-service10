import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../hooks/useAxios";
import UpdateService from "../components/updateService";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const fetchAxios = useAxios();

  useEffect(() => {
    if (user?.email) {
      fetchAxios.get(`/service/my-services?email=${user.email}`).then((res) => {
        console.log(res.data);
        setMyServices(res.data);
      });
    }
  }, [user, fetchAxios]);

  // Update Service
  // Update handler — modifies local state after modal update
  const handleServiceUpdated = (id, updatedData) => {
    setMyServices((prev) =>
      prev.map((service) =>
        service._id === id ? { ...service, ...updatedData } : service
      )
    );
  };

  // Delete service (for provider)
  const handleDeleteService = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchAxios
          .delete(`/service/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your service has been deleted.",
                icon: "success",
              });
              setMyServices((prev) => prev.filter((s) => s._id !== _id));
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the service.",
            });
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-4xl font-bold mb-6 text-center text-purple-700">
        My Services ({myServices.length})
      </h3>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-200">
        <table className="table w-full">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myServices.length > 0 ? (
              myServices.map((service, index) => (
                <tr
                  key={service._id}
                  className="hover:bg-purple-50 transition-all"
                >
                  <td className="font-semibold">{index + 1}</td>

                  {/* Image + Service Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img src={service.image} alt={service.serviceName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {service.serviceName}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-[180px]">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-600">{service.category}</td>
                  <td className="text-gray-700 font-semibold">
                    ${service.price}
                  </td>

                  {/* Status Badge */}
                  <td>
                    {service.status === "booked" ? (
                      <div className="badge badge-success py-2 px-3">
                        Booked
                      </div>
                    ) : (
                      <div className="badge badge-warning py-2 px-3">
                        Not Booked
                      </div>
                    )}
                  </td>

                  {/* Delete,update Button */}

                  <td>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                    <UpdateService
                      service={service}
                      onUpdated={handleServiceUpdated}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
