import axiosInstance from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const axios = axiosInstance.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

axios.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(new Error(err?.response?.data ?? err.message))
);
