import React, { useContext } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../hooks/useAxios";

const AddServicePage = () => {
  const { user } = useContext(AuthContext);
  const fetchAxios = useAxios();

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const serviceName = e.target.serviceName.value;
    const category = e.target.category.value;
    const price = parseFloat(e.target.price.value);
    const description = e.target.description.value;
    const image = e.target.image.value;

    const newService = {
      serviceName,
      category,
      price,
      description,
      providerEmail: user.email,
      image,
      reviews: [],
    };

    fetchAxios
      .post("/service", newService)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Service Added",
          text: `${serviceName} has been added successfully!`,
        });
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while adding the service",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 py-12 bg-purple-50">
      {/* Back Link */}
      <Link
        to="/service"
        className="text-2xl font-bold flex justify-center items-center mb-6 text-purple-700 hover:text-purple-900 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Back To Services
      </Link>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Add a <span className="text-purple-600">Service</span>
      </h1>

      {/* Form */}
      <form
        onSubmit={handleCreateSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-200"
      >
        {/* Service Name */}
        <label className="label text-gray-700 font-semibold mb-1">
          Service Name
        </label>
        <input
          type="text"
          name="serviceName"
          className="input mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          placeholder="Service Name"
          required
        />

        {/* Category */}
        <label className="label text-gray-700 font-semibold mb-1">
          Category
        </label>
        <select
          name="category"
          className="input mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Electrician">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Home Renovation">Home Renovation</option>
          <option value="Flooring">Flooring</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Painting">Painting</option>
        </select>

        {/* Price */}
        <label className="label text-gray-700 font-semibold mb-1">Price</label>
        <input
          type="number"
          name="price"
          className="input mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          placeholder="Price"
          required
        />

        {/* Description */}
        <label className="label text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          name="description"
          className="input mb-4 border border-gray-300 rounded-lg px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          placeholder="Description"
          required
        />

        {/* Image URL */}
        <label className="label text-gray-700 font-semibold mb-1">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          className="input mb-6 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          placeholder="Image URL"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServicePage;
