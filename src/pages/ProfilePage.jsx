import React, { useContext } from "react";

import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logOut } = useContext(AuthContext);
  if (!user) {
    toast.error("user not found");
    return null;
  }
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
  const UpdateProfile = () => {
    toast.success("profile updated successfully");
  };
  return (
    <div>
      <h1 className="md:text-5xl text-2xl font-bold  text-center bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent ">
        Your Profile
      </h1>
      <div className=" items-center text-black md:py-20 ">
        <div className="hero-content flex-col lg:flex-row md:gap-10">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User profile"}
            className=" md:w-32 md:h-40 rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="md:text-2xl font-bold">{user?.displayName}</h1>
            <p className=" md:text-xl py-3">{user?.email}</p>
            <div className="mt-5">
              <button
                onClick={UpdateProfile}
                className=" btn md:text-[16px] text-xs bg-green-600 text-white hover:opacity-90 border-0 mr-10"
              >
                Update
              </button>
              <button
                onClick={handleLogout}
                className=" btn md:text-[16px] text-xs bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 border-0"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
