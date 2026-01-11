
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface HistoryEntry {
  employeeName: string;
  assignedDate: string;
  returnedDate: string | null;
}

interface DeviceHistoryProps {
  deviceId: number;
}

const DeviceHistory: React.FC<DeviceHistoryProps> = ({ deviceId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/devices/${deviceId}/history`);
        console.log('Device history response:', response.data);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching device history:', error);
        toast.error('Failed to fetch device history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [deviceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (history.length === 0) {
    return <p className="mt-4">No assignment history for this device.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Assignment History</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Employee Name</th>
            <th className="py-2 px-4 border-b">Assigned Date</th>
            <th className="py-2 px-4 border-b">Returned Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">{entry.employeeName}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(entry.assignedDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-center">{entry.returnedDate ? new Date(entry.returnedDate).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceHistory;
