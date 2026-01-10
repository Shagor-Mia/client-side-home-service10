import React, { useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import UpdateProfileModal from "../components/UpdateProfile";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="md:text-5xl text-2xl font-bold text-center text-base-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your Profile
      </motion.h1>

      <motion.div
        className="items-center text-base-content md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="hero-content flex-col lg:flex-row md:gap-10">
          <motion.img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User profile"}
            className="md:w-32 md:h-40 rounded-lg shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="md:text-2xl text-base-content font-bold">
              {user?.displayName}
            </h1>
            <p className="md:text-xl text-base-content py-3">{user?.email}</p>
            <div className="mt-5">
              <UpdateProfileModal />

              <motion.button
                onClick={handleLogout}
                className="btn md:text-[16px] text-xs bg-red-500 text-white hover:opacity-90 border-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
