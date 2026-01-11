import axios from 'axios';
import { Asset, Employee } from '../types';

const API_URL = 'http://localhost:3000/api';

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await axios.get(`${API_URL}/assets`);
  return response.data;
};

export const addAsset = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  const response = await axios.post(`${API_URL}/assets`, asset);
  return response.data;
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export const addEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
};
