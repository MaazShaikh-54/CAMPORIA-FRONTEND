import axios from "axios";

const API_URL = "https://camporia-backend.onrender.com/admin";

//User management
export const getUsers = async (config) => {
    return await axios.get(`${API_URL}/users`, config);
}
export const updateUser = async (userData) => {
    return await axios.put(`${API_URL}/update-user`, userData);
};
export const deleteUser = async (id, config) => {
  return await axios.delete(`${API_URL}/delete-user/${id}`, config);
};

//Campsite management
export const getCampsites = async (config) => {
    return await axios.get(`${API_URL}/campsites`, config);
}
export const addCampsite = async (campsiteData, config) => {
    return await axios.post(`${API_URL}/add-campsite`, campsiteData, config);
}
export const updateCampsite = async (id, campsiteData, config) => {
    return await axios.put(`${API_URL}/update-campsite/${id}`, campsiteData, config);
}
export const deleteCampsite = async (id, config) => {
    return await axios.delete(`${API_URL}/delete-campsite/${id}`, config);
}