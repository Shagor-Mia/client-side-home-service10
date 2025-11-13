import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://householdserviceserver.vercel.app",
});

export const useAxios = () => {
  return axiosInstance;
};
