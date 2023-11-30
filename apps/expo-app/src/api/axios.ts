import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.EXPO_PUBLIC_API_URL,
  },
});

export default axiosInstance;
