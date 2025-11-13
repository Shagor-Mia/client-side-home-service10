import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";

const instance = axios.create({
  baseURL: "https://householdserviceserver.vercel.app",
});

export const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterCeptor = instance.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const resInterCeptor = instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterCeptor);
      instance.interceptors.response.eject(resInterCeptor);
    };
  }, [logOut, navigate]);

  return instance;
};
