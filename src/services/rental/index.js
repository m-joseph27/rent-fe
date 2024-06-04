import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:1100/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createRental = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const updateRental = async (endpoint, id, data) => {
  try {
    const response = await apiClient.put(endpoint, id, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const deleteRental = async (endpoint, id) => {
  try {
    const response = await apiClient.delete(endpoint, id);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export default apiClient;