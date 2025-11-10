import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  const bgImages = [
    "https://i.ibb.co.com/sv2cFfXf/paint4.jpg",
    "https://i.ibb.co.com/spQjCkGx/reno3.jpg",
    "https://i.ibb.co.com/gLKjrQHP/flo2.jpg",
    "https://i.ibb.co.com/S4yybvKr/paint2.jpg",
  ];
  const homeImages = [
    "https://i.ibb.co.com/VWGVLPFx/homelogo1.png",
    "https://i.ibb.co.com/gLvm0qZ1/homelogo3.png",
    "https://i.ibb.co.com/1kPv4Qt/homelogo2.png",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  //   const [homeIndex, setHomeIndex] = useState(0);

  // Background auto-slide every 5s
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(bgInterval);
  }, [bgImages.length]);

  // Home image auto-slide every 3s
  //   useEffect(() => {
  //     const HomeInterval = setInterval(() => {
  //       setHomeIndex((prev) => (prev + 1) % HomeImages.length);
  //     }, 4000);
  //     return () => clearInterval(HomeInterval);
  //   }, [HomeImages.length]);

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
          <Link
            to="/service"
            className="btn bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 border-0 pointer-events-auto"
          >
            Contact Us
          </Link>
        </div>

        {/* home image 3D rotate */}
        <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] perspective-1000">
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateY: [90, 360],
            }}
            transition={{
              repeat: 3,
              duration: 10,
              ease: "linear",
            }}
          >
            {homeImages.map((img, i) => {
              const angle = (i / homeImages.length) * 360;
              return (
                <motion.img
                  key={i}
                  src={img}
                  alt={`logo-${i}`}
                  className="absolute w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain rounded-full shadow-lg"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(100px)`,
                  }}
                  whileHover={{
                    scale: 1.3,
                    filter: "brightness(1.3)",
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
