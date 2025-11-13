import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../hooks/useAxios";
import LoadingPage from "./LoadingPage";

const MyBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const fetchAxios = useAxios();

  useEffect(() => {
    if (user?.email) {
      fetchAxios
        .get(`/bookings/my-bookings?email=${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user, fetchAxios]);

  // Delete booking
  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be canceled permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchAxios
          .delete(`/bookings/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire(
                "Canceled!",
                "Your booking has been canceled.",
                "success"
              );
              setBookings((prev) => prev.filter((b) => b._id !== id));
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to cancel booking.", "error");
          });
      }
    });
  };

  // View booking details (could open modal or navigate)
  const handleViewDetails = (booking) => {
    console.log(booking);
    Swal.fire({
      title: booking.serviceName,
      html: `
        <p><strong>Booking Date:</strong> ${booking?.bookingDate}</p>
        <p><strong>Price:</strong> $${booking?.price}</p>
        <p><strong>Status:</strong> ${booking?.status}</p>
        <p><strong>Provider Email:</strong> ${
          booking?.providerEmail || "N/A"
        }</p>
      `,
      confirmButtonText: "Close",
    });
  };

  if (loading || !bookings) {
    <LoadingPage />;
  }

  return (
    <div className="md:p-6 p-0">
      <h3 className="md:text-4xl text-2xl font-bold md:mb-6  mb-3 text-center text-purple-700">
        My Bookings ({bookings.length})
      </h3>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-200">
        <table className="table w-full">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Booking Date</th>
              <th>Price ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-purple-50 transition-all"
                >
                  <td className="font-semibold">{index + 1}</td>
                  <td className="font-semibold text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img src={booking.image} alt={booking.serviceName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 md:text-sm text-xs">
                          {booking.serviceName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-700 md:text-sm text-xs">
                    {booking.bookingDate}
                  </td>
                  <td className="text-gray-700 font-semibold md:text-sm text-xs">
                    ${booking.price}
                  </td>
                  <td>
                    {booking.status === "booked" ? (
                      <div className="badge badge-success md:py-2 py-3 px-3 md:text-sm text-xs">
                        Booked
                      </div>
                    ) : (
                      <div className="badge badge-warning md:py-2 py-3 px-3 md:text-sm text-xs">
                        Pending
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg md:text-sm text-xs"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="btn btn-sm md:ml-3 bg-red-500 hover:bg-red-600 text-white rounded-lg md:text-sm text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  You have no bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
