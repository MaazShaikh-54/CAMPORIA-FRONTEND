import axios from "axios";

const API_URL = "https://camporia-backend.onrender.com/admin";

export const getUsers = async (config) => {
    return await axios.get(`${API_URL}/users`, config);
}

export const updateUser = async (userData) => {
    return await axios.put(`${API_URL}/update-user`, userData);
};

export const deleteUser = async (id, config) => {
  return await axios.delete(`${API_URL}/delete-user/${id}`, config);
};