import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
});

export const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterCeptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken;
      console.log(token);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });
    // response interceptor
    const resInterCeptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        // if (status === 401 || status === 403) {
        //   logOut().then(() => {
        //     navigate("/login");
        //   });

        // }
        console.log(status, err.message);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterCeptor);
      instance.interceptors.response.eject(resInterCeptor);
    };
  }, [user, logOut, navigate]);
  return instance;
};
