import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Đặt base URL cho tất cả các yêu cầu API
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { resetUserInformation } = useAuthStore.getState()
//     if (error.config?.url !== '/login' && error.response?.status === 401) {
//       try {
//         const response = await axios.post('/api/v1/refresh')
//         return axiosInstance(error.config)
//       } catch (refreshError) {
//         resetUserInformation()
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export default axiosInstance;
