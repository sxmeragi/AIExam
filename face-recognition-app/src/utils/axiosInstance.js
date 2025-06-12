import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) return req;

  const user = jwtDecode(accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  }

  try {
    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: localStorage.getItem("refresh_token"),
    });

    const newAccess = response.data.access;
    localStorage.setItem("access_token", newAccess);
    req.headers.Authorization = `Bearer ${newAccess}`;
    return req;
  } catch (err) {
    console.error("Token refresh error:", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    return Promise.reject(err);
  }
});

export default axiosInstance;
