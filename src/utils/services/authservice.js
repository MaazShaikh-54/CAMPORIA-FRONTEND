import axios from "axios";

// const API_URL = "http://localhost:5000/auth";
const API_URL = "https://camporia-backend.onrender.com/auth";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const getUserProfile = async (token) => {
  return await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const logoutUser = async (userData) => {
  return await axios.post(`${API_URL}/logout`, userData);
}