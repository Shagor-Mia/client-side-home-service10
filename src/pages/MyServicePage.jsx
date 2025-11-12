import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../hooks/useAxios";
import UpdateService from "../components/UpdateService";

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
    <div className="md:p-6 p-0">
      <h3 className="md:text-4xl text-2xl font-bold md:mb-6  mb-3 text-center text-purple-700">
        My Services ({myServices.length})
      </h3>

      <div className="overflow-x-auto md:rounded-2xl rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="table w-full min-w-[650px]">
          <thead className="bg-purple-100 text-gray-700 text-sm md:text-base">
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
                        <div className="font-semibold text-gray-800 md:text-sm text-xs">
                          {service.serviceName}
                        </div>
                        <div className="md:text-sm text-xs text-gray-500 truncate max-w-[180px]">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-600 md:text-sm text-xs">
                    {service.category}
                  </td>
                  <td className="text-gray-700 font-semibold md:text-sm text-xs">
                    ${service.price}
                  </td>

                  {/* Status Badge */}
                  <td>
                    {service.status === "booked" ? (
                      <div className="badge badge-success md:py-2 py-3 px-3 md:text-sm text-xs">
                        Booked
                      </div>
                    ) : (
                      <div className="badge badge-warning md:py-2 py-4 md:px-3 px-2 md:text-sm text-xs">
                        Not Booked
                      </div>
                    )}
                  </td>

                  {/* Delete,update Button */}

                  <td>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white  text-xs rounded-lg"
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
