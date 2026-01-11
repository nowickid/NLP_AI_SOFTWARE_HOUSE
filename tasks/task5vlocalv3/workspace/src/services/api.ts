import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Asset Functions
export const getAssets = async (params) => {
    const response = await apiClient.get('/assets', { params });
    return response.data;
};
export const createAsset = async (assetData) => {
    const response = await apiClient.post('/assets', assetData);
    return response.data;
};

// Employee Functions
export const getEmployees = async () => {
    const response = await apiClient.get('/employees');
    return response.data;
};
export const createEmployee = async (employeeData) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
};
export const getEmployeeAssets = async (employeeId) => {
    const response = await apiClient.get(`/employees/${employeeId}/assets`);
    return response.data;
};

// Asset Lifecycle Functions
export const assignAsset = async (assetId, employeeId) => {
    const response = await apiClient.post('/assignments', { asset_id: assetId, employee_id: employeeId });
    return response.data;
};

export const flagForMaintenance = async (assetId, issueDescription) => {
    const data: { asset_id: any; issue_description?: string } = { asset_id: assetId };
    if (issueDescription) {
        data.issue_description = issueDescription;
    }
    const response = await apiClient.post('/maintenance', data);
    return response.data;
};

export const getAssetHistory = async (assetId) => {
    const response = await apiClient.get(`/assets/${assetId}/history`);
    return response.data;
};
