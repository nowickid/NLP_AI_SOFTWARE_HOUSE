import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of a single history record based on the API spec
interface AssignmentHistory {
  assignment_id: number;
  employee_name: string;
  assigned_at: string;
  returned_at: string | null;
}

// Define the props for the component
interface AssetHistoryModalProps {
  assetId: number;
  onClose: () => void;
}

const AssetHistoryModal: React.FC<AssetHistoryModalProps> = ({ assetId, onClose }) => {
  const [history, setHistory] = useState<AssignmentHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Do not fetch if assetId is not valid (e.g., 0 or null)
    if (!assetId) {
        setIsLoading(false);
        setError("Invalid Asset ID provided.");
        return;
    };

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, the base URL would be in an env variable
        const response = await axios.get(`http://localhost:3000/api/assets/${assetId}/history`);
        setHistory(response.data);
      } catch (err) {
        // A more robust error handling would check err.response.data
        setError('Failed to fetch asset history. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [assetId]); // Re-run the effect if assetId changes

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the click is on the backdrop itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-400">Loading history...</p>;
    }

    if (error) {
      return <p className="text-center text-red-400">{error}</p>;
    }

    if (history.length === 0) {
      return <p className="text-center text-gray-400">No assignment history found for this asset.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-700 text-xs text-gray-300 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Assigned Date</th>
              <th scope="col" className="px-6 py-3">Returned Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.assignment_id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{record.employee_name}</td>
                <td className="px-6 py-4">{formatDate(record.assigned_at)}</td>
                <td className="px-6 py-4">{formatDate(record.returned_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] m-4 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            Asset Assignment History (ID: {assetId})
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {renderContent()}
        </div>

         {/* Modal Footer */}
         <div className="flex items-center justify-end p-4 border-t border-gray-700 rounded-b">
            <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-lg text-center"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default AssetHistoryModal;
