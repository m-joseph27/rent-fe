import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:1100/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getCars = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createCar = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const updateCar = async (endpoint, id, data) => {
  try {
    const response = await apiClient.put(endpoint, id, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const deleteCar = async (endpoint, id) => {
  try {
    const response = await apiClient.delete(endpoint, id);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const uploadImage = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export default apiClient;