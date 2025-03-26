// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7051/api', // Đặt base URL cho tất cả các yêu cầu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
