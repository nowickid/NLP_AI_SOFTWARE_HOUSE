import React, { useState, useEffect } from 'react';
import { getAssetHistory } from '../services/api';

interface AssetHistoryModalProps {
  assetId: number | string;
  isOpen: boolean;
  onClose: () => void;
}

const AssetHistoryModal: React.FC<AssetHistoryModalProps> = ({ assetId, isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && assetId !== null && assetId !== undefined) {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const data = await getAssetHistory(assetId);
          setHistory(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [isOpen, assetId]);

  if (!isOpen) return null;

  return (
    <div>
      <h2>Asset Assignment History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Assigned Date</th>
              <th>Returned Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.assignment_id}>
                <td>{item.employee_name}</td>
                <td>{item.assigned_at}</td>
                <td>{item.returned_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AssetHistoryModal;
