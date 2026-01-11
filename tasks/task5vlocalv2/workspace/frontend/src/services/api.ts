import { Asset, Employee, Assignment } from '../types';

const API_BASE_URL = 'http://localhost:3000'; // Example base URL

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${API_BASE_URL}/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_BASE_URL}/employees`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const assignAsset = async (assetId: number, employeeId: number): Promise<Assignment> => {
  const response = await fetch(`${API_BASE_URL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ asset_id: assetId, employee_id: employeeId })
  });

  if (!response.ok) {
    throw new Error(`Failed to assign asset. Status code: ${response.status}`);
  }

  return response.json();
};
