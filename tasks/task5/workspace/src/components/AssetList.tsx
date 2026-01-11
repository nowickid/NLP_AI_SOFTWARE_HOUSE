import React, { useState, useEffect } from 'react';
import AssetHistoryModal from './AssetHistoryModal';

type Asset = {
  id: number;
  type: string;
  serial_number: string;
  status: 'available' | 'assigned' | 'maintenance';
};

const AssetList: React.FC<{ refreshKey: number | string }> = ({ refreshKey }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hardcoded data for development purposes
        const data: Asset[] = [
          { id: 1, type: 'Laptop', serial_number: 'SN12345', status: 'assigned' },
          { id: 2, type: 'Monitor', serial_number: 'SN67890', status: 'available' },
          { id: 3, type: 'Keyboard', serial_number: 'SN54321', status: 'maintenance' },
          { id: 4, type: 'Mouse', serial_number: 'SN09876', status: 'available' },
        ];
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setAssets(data);
      } catch (err) {
        setError('Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [refreshKey]);

  if (loading) {
    return <div className="text-center p-4 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Serial Number</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{asset.id}</td>
                <td className="py-3 px-4">{asset.type}</td>
                <td className="py-3 px-4">{asset.serial_number}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      asset.status === 'available'
                        ? 'bg-green-200 text-green-800'
                        : asset.status === 'assigned'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedAssetId(asset.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAssetId && (
        <AssetHistoryModal
          assetId={selectedAssetId}
          onClose={() => setSelectedAssetId(null)}
        />
      )}
    </>
  );
};

export default AssetList;
