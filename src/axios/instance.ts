import axios from 'axios';

const baseURL = process.env.VITE_API_URL || 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

// Axios interceptor to add the token to each request
axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('authToken'); // Retrieve the token
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
});

export default axiosInstance;
