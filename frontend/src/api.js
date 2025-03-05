import axios from "axios";

const API_BASE_URL = "http://localhost:5555"; // Your backend server URL

export const registerUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/users/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/users/auth/login`, userData);
};
