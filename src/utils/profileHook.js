import axios from "axios";

const API_URL = "https://camporia-backend.onrender.com/users";

export const getUserProfile = async (config) => {
    return await axios.get(`${API_URL}/profile`, config);
}

export const editUserProfile = async (userData) => {
    return await axios.put(`${API_URL}/edit-profile`, userData);
};

export const deleteUserProfile = async (userData) => {
  return await axios.delete(`${API_URL}/delete-profile`, userData);
};