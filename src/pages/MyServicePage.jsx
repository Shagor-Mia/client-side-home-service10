import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../hooks/useAxios";
import UpdateService from "../components/UpdateService";
import LoadingPage from "./LoadingPage";

const MyServices = () => {
  const { user, loading } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const fetchAxios = useAxios();

  useEffect(() => {
    if (user?.email) {
      fetchAxios.get(`/service/my-services?email=${user.email}`).then((res) => {
        setMyServices(res.data);
      });
    }
  }, [user, fetchAxios]);

  const handleServiceUpdated = (id, updatedData) => {
    setMyServices((prev) =>
      prev.map((service) =>
        service._id === id ? { ...service, ...updatedData } : service
      )
    );
  };

  const handleDeleteService = (_id) => {
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

  if (loading || !myServices) {
    return <LoadingPage />;
  }

  return (
    <div className="md:p-6 p-0">
      <h3 className="md:text-4xl text-2xl font-bold md:mb-6 mb-3 text-center text-base-content">
        My Services ({myServices.length})
      </h3>

      <div className="overflow-x-auto md:rounded-2xl rounded-xl shadow-lg bg-base-100 border border-base-200">
        <table className="table w-full min-w-[650px]">
          <thead className="bg-purple-100 dark:bg-gray-800 text-base-content dark:text-white text-sm md:text-base">
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
                <tr key={service._id} className=" transition-all">
                  <td className="font-semibold text-base-content">
                    {index + 1}
                  </td>

                  {/* Image + Service Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img src={service.image} alt={service.serviceName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-base-content md:text-sm text-xs">
                          {service.serviceName}
                        </div>
                        <div className="md:text-sm text-xs text-base-content/70 truncate max-w-[180px]">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-base-content/70 md:text-sm text-xs">
                    {service.category}
                  </td>
                  <td className="text-base-content font-semibold md:text-sm text-xs">
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

                  {/* Delete, Update Buttons */}
                  <td>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg"
                      >
                        Delete
                      </button>
                      <UpdateService
                        service={service}
                        onUpdated={handleServiceUpdated}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-base-content/70"
                >
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
