import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  const bgImages = [
    "https://i.ibb.co.com/VYCKF8Gq/paint4.jpg",
    "https://i.ibb.co.com/dJD3LKSL/reno3.jpg",
    "https://i.ibb.co.com/cc5CBJPn/flo2.jpg",
    "https://i.ibb.co.com/W49GXdRb/elc3.jpg",
  ];

  const [bgIndex, setBgIndex] = useState(0);

  // Background auto-slide every 5s
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, [bgImages.length]);

  return (
    <div className="relative w-full md:rounded-2xl rounded-xl overflow-hidden min-h-[300px]  md:min-h-[500px] lg:min-h-[600px]">
      {/* Background carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgImages[bgIndex]}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay content */}
      <div className="absolute inset-0 md:p-10 lg:p-20 flex flex-col md:flex-row items-center justify-center z-20 lg:gap-5">
        <div className="space-y-5 text-center md:text-left">
          <h1 className="md:text-5xl text-3xl font-bold text-white">
            Modify Your Old House or, <br /> Recreate With Big Bounce?
          </h1>
          <p className="font-semibold md:text-xl text-xs text-white">
            we will give you Best Service as Your Requirement.
          </p>
          <h2 className="font-semibold md:text-2xl text-xs text-white">
            For more Details Explore Us..
          </h2>
          <Link
            to="/service"
            className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 border-0 pointer-events-auto"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
