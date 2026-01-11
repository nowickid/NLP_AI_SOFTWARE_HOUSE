import axios from 'axios';

const API_URL = '/api'; // Assuming the API is served from the same domain

export const getAvailableDevices = () => {
  // Mocking the API call for now
  return Promise.resolve({
    data: [
      { id: 1, type: 'Type A', serialNumber: 'SN001', status: 'Available' },
      { id: 2, type: 'Type B', serialNumber: 'SN002', status: 'In Use' },
      { id: 3, type: 'Type A', serialNumber: 'SN003', status: 'Available' },
    ],
  });
  // In a real application, you would use axios to make the API call
  // return axios.get(`${API_URL}/devices`);
};

export const getEmployees = () => {
  return axios.get(`${API_URL}/employees`);
};
