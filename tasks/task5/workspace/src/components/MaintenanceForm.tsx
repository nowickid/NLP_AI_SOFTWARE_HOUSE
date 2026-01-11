import React, { useState } from 'react';
import axios from 'axios';

const MaintenanceForm: React.FC = () => {
  const [assetId, setAssetId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!assetId) {
      setError('Asset ID is required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/maintenance', {
        asset_id: parseInt(assetId, 10),
        issue_description: issueDescription,
      });

      if (response.status === 201) {
        setSuccess('Maintenance request submitted successfully!');
        setAssetId('');
        setIssueDescription('');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError('Failed to submit maintenance request. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Maintenance Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="asset_id" className="block text-sm font-medium text-gray-300 mb-1">
            Asset ID
          </label>
          <input
            id="asset_id"
            type="number"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            placeholder="e.g., 123"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="issue_description" className="block text-sm font-medium text-gray-300 mb-1">
            Issue Description (Optional)
          </label>
          <textarea
            id="issue_description"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="e.g., Screen is flickering"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
      <div className="mt-4 text-center">
        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default MaintenanceForm;
