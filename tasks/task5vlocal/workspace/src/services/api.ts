import { Asset, Employee, AssignmentHistory } from '../types';

const API_URL = 'http://localhost:3000/api';

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${API_URL}/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const assignAsset = async (assetId: number, employeeId: number): Promise<Asset> => {
  const response = await fetch(`${API_URL}/assets/${assetId}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employee_id: employeeId }),
  });
  if (!response.ok) {
    throw new Error('Failed to assign asset');
  }
  return response.json();
};

export const returnAsset = async (assetId: number): Promise<Asset> => {
    const response = await fetch(`${API_URL}/assets/${assetId}/return`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to return asset');
    }
    return response.json();
  };

export const addAsset = async (asset: Omit<Asset, 'id' | 'status' | 'assigned_to' | 'maintenance_notes'>): Promise<Asset> => {
    const response = await fetch(`${API_URL}/assets`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(asset),
    });
    if (!response.ok) {
        throw new Error('Failed to add asset');
    }
    return response.json();
}

export const setMaintenance = async (assetId: number, notes: string): Promise<Asset> => {
    const response = await fetch(`${API_URL}/assets/${assetId}/maintenance`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
    });
    if (!response.ok) {
        throw new Error('Failed to set maintenance');
    }
    return response.json();
}

export const clearMaintenance = async (assetId: number): Promise<Asset> => {
    const response = await fetch(`${API_URL}/assets/${assetId}/maintenance`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to clear maintenance');
    }
    return response.json();
}

export const disposeAsset = async (assetId: number): Promise<Asset> => {
    const response = await fetch(`${API_URL}/assets/${assetId}/dispose`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to dispose asset');
    }
    return response.json();
}

export const getAssetHistory = async (assetId: number): Promise<AssignmentHistory[]> => {
  const response = await fetch(`${API_URL}/assets/${assetId}/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch asset history');
  }
  return response.json();
};
