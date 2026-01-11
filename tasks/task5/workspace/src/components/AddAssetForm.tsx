import React, { useState } from 'react';
import axios from 'axios';

interface AddAssetFormProps {
  onAssetAdded: () => void;
}

const AddAssetForm: React.FC<AddAssetFormProps> = ({ onAssetAdded }) => {
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!type || !serialNumber) {
      setError('Both fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/assets', {
        type,
        serial_number: serialNumber,
      });

      if (response.status === 201) {
        setSuccess('Asset added successfully!');
        setType('');
        setSerialNumber('');
        onAssetAdded();
        setTimeout(() => setSuccess(null), 3000); // Clear message after 3 seconds
      }
    } catch (err) {
      setError('Failed to add asset. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Asset</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Asset Type
          </label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g., Laptop, Monitor"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="serial_number" className="block text-sm font-medium text-gray-300 mb-1">
            Serial Number
          </label>
          <input
            id="serial_number"
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="e.g., SN123456789"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Asset'}
        </button>
      </form>
      <div className="mt-4 text-center">
        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default AddAssetForm;
