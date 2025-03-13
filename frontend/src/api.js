import axios from "axios";

const API_BASE_URL = "http://localhost:5555"; // Your backend server URL

export const registerUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/users/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/users/auth/login`, userData);
};

// Fetch user details (protected route)
export const fetchUserDetails = async (token) => {
  return axios.get(`${API_BASE_URL}/api/users/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update user details (protected route)
export const updateUserDetails = async (token, updatedData) => {
  return axios.put(`${API_BASE_URL}/api/users/auth/user`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAccount = async (token) => {
  return axios.delete(`${API_BASE_URL}/api/users/auth/delete-account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = async (email, newPassword) => {
  const payload = { email, newPassword };
  console.log('Sending forgot password request:', payload); // Log the payload
  return axios.post(`${API_BASE_URL}/api/users/auth/forgot-password`, payload);
};