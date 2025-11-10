import { Link, useNavigate } from "react-router";

import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const { createUser, updateUser, setUser, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    const nameRegExp = /^[A-Za-z\s]{5,}$/; // only letters, at least 5 chars
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple valid email
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{6,}$/;

    console.log(regExp.test(password));
    if (!displayName || !nameRegExp.test(displayName)) {
      toast.error(
        "Please enter a valid name (only letters, at least 5 characters)."
      );
      return;
    }

    if (!email || !emailRegExp.test(email)) {
      toast.error("Please enter a valid email address (sagor@mail.com).");
      return;
    }

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    setLoading(true); // start loading

    try {
      const result = await createUser(email, password);
      const user = result.user;
      await updateUser({ displayName, photoURL });
      setUser({ ...user, displayName, photoURL });
      navigate("/");
      toast.success("Signup successful!");
    } catch (e) {
      // handle Firebase errors
      if (e.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login or use another email.");
      } else if (e.code === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else if (e.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error(e.message || "Something went wrong.");
      }
    } finally {
      setLoading(false); // always stop loading
    }
  };
  return (
    // override the css margin padding
    <div
      className=" -mx-4 md:-mx-8 lg:-mx-12 -my-4 md:-my-8 lg:-my-12 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4 "
      style={{
        backgroundImage: `url(https://i.ibb.co.com/bjxTs9hL/elc11.jpg)`,
      }}
    >
      <div className="  flex justify-center min-h-screen items-center ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-7 mx-10 my-20">
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
          <form onSubmit={handleRegister} className="card-body">
            <div className="border-t-2 text-gray-200 "></div>
            <fieldset className="fieldset">
              <label className="label">Your Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="enter your name"
                required
              />

              <label className="label">PhotoURL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="your photo"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
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
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
            </fieldset>
            <p className="font-semibold">
              Alraedy Have An Account ?
              <Link to={"/login"} className="text-secondary">
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
