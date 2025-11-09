import React, { use } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/paw-logo.png";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const Navbar = () => {
  const { user, logOut, loading } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("logout Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const linkActive = ({ isActive }) =>
    isActive
      ? "relative bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-br after:from-[#632ee3] after:to-[#9f62f2] after:transition-all after:duration-300 after:w-full"
      : "";

  const link = (
    <>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/"}>
          Home
        </NavLink>
      </li>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/service"}>
          Services
        </NavLink>
      </li>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/profile"}>
          My Profile
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-full sticky top-0 z-50 bg-base-100 shadow-sm mx-auto">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-0">
        <div className="flex justify-center items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link to={"/"}>
            <span>
              <img className="w-[40px] hidden md:block" src={logo} alt="logo" />
            </span>
          </Link>
          <Link
            to={"/"}
            className=" text-2xl  bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold hidden md:block"
          >
            WarmPaws
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="flex justify-center items-center md:gap-5 gap-2">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={`${
              user
                ? user.photoURL
                : "https://img.icons8.com/?size=40&id=23493&format=png"
            }`}
            alt="User Avatar"
            title={user ? user.displayName || "User" : "Guest"}
          />
          {loading ? (
            <ClockLoader height={5} color="#9f62f2" />
          ) : user ? (
            <button
              onClick={handleLogout}
              className="btn md:text-[16px] text-xs bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 md:mr-0 mr-4"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/signin"}
              className="btn md:text-[16px] text-xs bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 md:mr-0 mr-4"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
