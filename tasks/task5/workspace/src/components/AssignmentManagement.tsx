import React, { useState, useEffect } from 'react';

interface Asset {
  id: number;
  name: string;
}

const AssignmentManagement: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/assets?status=available');
        if (response.ok) {
          const data: Asset[] = await response.json();
          setAssets(data);
          if (data.length > 0) {
            setSelectedAsset(String(data[0].id));
          }
        } else {
          setError('Failed to fetch assets.');
        }
      } catch (err) {
        setError('An error occurred while fetching assets.');
      }
    };

    fetchAssets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedAsset || !employeeId) {
      setError('Please select an asset and enter an employee ID.');
      return;
    }

    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset_id: parseInt(selectedAsset, 10),
          employee_id: parseInt(employeeId, 10),
        }),
      });

      if (response.status === 201) {
        setMessage('Asset assigned successfully.');
        setEmployeeId('');
        // Optionally, refetch assets to remove the assigned one from the list
        const updatedAssets = assets.filter(asset => asset.id !== parseInt(selectedAsset, 10));
        setAssets(updatedAssets);
        if (updatedAssets.length > 0) {
          setSelectedAsset(String(updatedAssets[0].id));
        } else {
          setSelectedAsset('');
        }
      } else if (response.status === 409) {
        setError('Failed to assign asset. It may already be assigned or in maintenance.');
      } else {
        setError('An unknown error occurred.');
      }
    } catch (err) {
      setError('An error occurred while assigning the asset.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="asset" className="block text-gray-700 text-sm font-bold mb-2">
            Asset
          </label>
          <select
            id="asset"
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={assets.length === 0}
          >
            {assets.length > 0 ? (
              assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))
            ) : (
              <option>No available assets</option>
            )}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
            Employee ID
          </label>
          <input
            type="number"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Employee ID"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={assets.length === 0}
          >
            Assign Asset
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AssignmentManagement;
