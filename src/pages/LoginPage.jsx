import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const {
    setUser,
    setLoading,
    loginWithGoogle,
    loginWithEmailPass,
    resetPassword,
  } = useContext(AuthContext);

  const emailRef = useRef(null);

  const location = useLocation();
  //   const from = location.state || "/";
  const navigate = useNavigate();

  //   if (user) {
  //     navigate("/");
  //     return;
  //   }

  // email pass login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true); // start loader
    try {
      const res = await loginWithEmailPass(email, password);
      setUser(res.user);
      toast.success("Signin successful");
      navigate(location.state || "/");
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case "auth/user-not-found":
          toast.error("User not found. Please sign up first.");
          break;
        case "auth/wrong-password":
          toast.error("Wrong password. Please try again.");
          break;
        case "auth/user-disabled":
          toast.error("This user account has been disabled.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection.");
          break;
        case "auth/invalid-credential": // <--- NEW HANDLER
          toast.error(
            "Invalid email or password. Please check your credentials."
          );
          break;
        default:
          toast.error(e.message || "An unexpected error occurred.");
          break;
      }
    } finally {
      setLoading(false); // always stop loader
    }
  };

  //   reset password
  const handleForgetPassword = () => {
    console.log();
    const email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email to reset password");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  //   google sign in
  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate(`${location.state ? location.state : "/"}`);
      toast.success("Signin successful");
    } catch (e) {
      console.log(e);
      setError(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // override the css margin padding
    <div
      className=" -mx-4 md:-mx-8 lg:-mx-12 -my-4 md:-my-8 lg:-my-12 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4 "
      style={{
        backgroundImage: `url(https://i.ibb.co.com/1fVWmt2n/reno6.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-7 mx-10 my-20">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <form onSubmit={handleLogin} className="card-body">
          <div className="border-t-2 text-gray-200 "></div>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              className="input"
              placeholder="Email"
              required
            />
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="••••••••"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute md:right-[20px] right-[8px] top-[36px] cursor-pointer z-50"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            {error && <p className="text-secondary">{error}</p>}
            <button
              className="hover:underline hover:text-blue-400 text-left cursor-pointer"
              onClick={handleForgetPassword}
              type="button"
            >
              Forget password?
            </button>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-white/30"></div>
              <span className="text-sm text-white/70">or</span>
              <div className="h-px w-16 bg-white/30"></div>
            </div>
            {/* Google Signin */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </fieldset>
          <p className="font-semibold">
            Don't Have An Account ?
            <Link to={"/register"} className="text-secondary">
              {"  "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
