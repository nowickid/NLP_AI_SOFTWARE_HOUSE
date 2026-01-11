import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const addDevice = async (deviceData) => {
  const response = await api.post('/devices', deviceData);
  return response.data;
};

export const getAvailableDevices = async () => {
  const response = await api.get('/devices/available');
  return response.data;
};

export const assignDevice = async (assignmentData) => {
  const response = await api.post('/devices/assign', assignmentData);
  return response.data;
};

export const returnDevice = async (returnData) => {
  const response = await api.post('/devices/return', returnData);
  return response.data;
};

export const flagForMaintenance = async (maintenanceData) => {
  const response = await api.post('/devices/maintenance', maintenanceData);
  return response.data;
};

export const getEmployeeDevices = async (employeeId) => {
  const response = await api.get(`/employees/${employeeId}/devices`);
  return response.data;
};

export const getDeviceHistory = async (deviceId) => {
  const response = await api.get(`/devices/${deviceId}/history`);
  return response.data;
};
