import axios from "axios";

const ADMIN_API_URL = "https://camporia-backend.onrender.com/admin";
const API_URL = "https://camporia-backend.onrender.com";

//User management
export const getUsers = async (config) => {
    return await axios.get(`${ADMIN_API_URL}/users`, config);
}
export const updateUser = async (userData) => {
    return await axios.put(`${ADMIN_API_URL}/update-user`, userData);
};
export const deleteUser = async (id, config) => {
  return await axios.delete(`${ADMIN_API_URL}/delete-user/${id}`, config);
};

//Campsite management
export const getCampsites = async (config) => {
    return await axios.get(`${ADMIN_API_URL}/campsites`, config);
}
export const addCampsite = async (campsiteData, config) => {
    return await axios.post(`${ADMIN_API_URL}/add-campsite`, campsiteData, config);
}
export const updateCampsite = async (id, campsiteData, config) => {
    return await axios.put(`${ADMIN_API_URL}/update-campsite/${id}`, campsiteData, config);
}
export const deleteCampsite = async (id, config) => {
    return await axios.delete(`${ADMIN_API_URL}/delete-campsite/${id}`, config);
}

//Journey management
export const getJourneys = async (config) => {
    return await axios.get(`${ADMIN_API_URL}/journeys`, config);
}
export const updateJourney = async (id, journeyData, config) => {
    return await axios.put(`${ADMIN_API_URL}/update-journey/${id}`, journeyData, config);
}
export const deleteJourney = async (id, config) => {
    return await axios.delete(`${ADMIN_API_URL}/delete-journey/${id}`, config);
}

//Campsite
export const getCampsitesById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/campsites/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching campsite by ID:", error);
        throw error;
    }
};

//Journey
export const getJourneysById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/journeys/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching journey by ID:", error);
        throw error;
    }
};

export const getUserJourneys = async (config) => {
    return await axios.get(`${API_URL}/journeys/my-journeys`, config);
}
