import React from "react";
import { Link } from "react-router";
import logo from "../assets/paw-logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral text-neutral-content py-10 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Brand + Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="w-[40px]" src={logo} alt="logo" />
            <h2 className="text-xl font-semibold bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent">
              WarmPaws
            </h2>
          </Link>
          <p className="mt-3 text-center md:text-left text-sm">
            © {new Date().getFullYear()} WarmPaws Pet Care Centre. All rights
            reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2 text-white">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@warmpaws.com"
              className="hover:text-[#9f62f2]"
            >
              support@warmpaws.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+8801700000000" className="hover:text-[#9f62f2]">
              +880 1700 000 000
            </a>
          </p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2 text-white">Quick Links</h3>
          <Link to="/" className="hover:text-[#9f62f2]">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-[#9f62f2]">
            Terms & Conditions
          </Link>
          <Link to="/" className="hover:text-[#9f62f2]">
            Contact Page
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4">
            {/* Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#9f62f2] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337 3c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0016.616 3a4.92 4.92 0 00-4.92 4.92c0 .385.044.76.127 1.122C7.691 8.797 4.066 6.864 1.64 3.897a4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.096 4.903 4.903 0 01-2.228-.616v.062a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.936 4.936 0 004.604 3.42A9.867 9.867 0 010 19.54a13.933 13.933 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#9f62f2] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#9f62f2] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
