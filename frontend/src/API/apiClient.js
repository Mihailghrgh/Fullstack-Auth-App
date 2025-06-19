import axios from "axios";
import { redirect } from "next/navigation";

const options = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
};
const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        console.log("No access token error occurred>>>>>>>>>>>>>>");

        API.get("/auth/refresh", { withCredentials: true });
      } catch (error) {
        console.log("AXIOS ERROR RAW", error);
        console.log("AXIOS ERROR RESPONSE", error.response);
        console.log("AXIOS ERROR DATA", error.response?.data);
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
