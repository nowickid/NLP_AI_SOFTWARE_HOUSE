import { Asset } from '../types';

const sampleAssets: Asset[] = [
  { id: 1, type: 'Laptop', serial_number: 'SN12345', status: 'available' },
  { id: 2, type: 'Monitor', serial_number: 'SN67890', status: 'assigned' },
  { id: 3, type: 'Keyboard', serial_number: 'SN54321', status: 'maintenance' },
  { id: 4, type: 'Laptop', serial_number: 'SN12346', status: 'available' },
  { id: 5, type: 'Mouse', serial_number: 'SN12347', status: 'assigned' },
];

export const fetchAssets = (status?: 'available' | 'assigned' | 'maintenance'): Promise<Asset[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (status) {
          const filteredAssets = sampleAssets.filter(asset => asset.status === status);
          resolve(filteredAssets);
        } else {
          resolve(sampleAssets);
        }
      } catch (error) {
        reject(new Error('Failed to fetch assets.'));
      }
    }, 500); // Simulate network delay
  });
};
