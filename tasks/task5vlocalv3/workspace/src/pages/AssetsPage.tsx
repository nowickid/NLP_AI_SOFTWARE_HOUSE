import React, { useState, useEffect } from 'react';
import { getAssets, assignAsset, flagForMaintenance, getAssetHistory } from '../services/api';
import Modal from '../components/ui/Modal';
import AssignAssetForm from '../components/AssignAssetForm';
import FlagMaintenanceForm from '../components/FlagMaintenanceForm';
import AssetHistoryList from '../components/AssetHistoryList';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const refetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAssignAsset = async (assetId, employeeId) => {
    try {
      await assignAsset(assetId, employeeId);
      refetchAssets();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFlagForMaintenance = async (assetId, issueDescription) => {
    try {
      await flagForMaintenance(assetId, issueDescription);
      refetchAssets();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewHistory = async (assetId) => {
    try {
      const history = await getAssetHistory(assetId);
      // Render history
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Assets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Model</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.model}</td>
                <td>{asset.status}</td>
                <td>
                  {asset.status === 'available' && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setAssignModalOpen(true);
                      }}
                    >
                      Assign
                    </button>
                  )}
                  {(asset.status === 'available' || asset.status === 'assigned') && (
                    <button
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setMaintenanceModalOpen(true);
                      }}
                    >
                      Flag for Maintenance
                    </button>
                  )}
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setHistoryModalOpen(true);
                    }}
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)}>
        {selectedAsset && (
          <AssignAssetForm
            assetId={selectedAsset.id}
            onSuccess={() => {
              refetchAssets();
              setAssignModalOpen(false);
            }}
            onCancel={() => setAssignModalOpen(false)}
          />
        )}
      </Modal>
      <Modal isOpen={maintenanceModalOpen} onClose={() => setMaintenanceModalOpen(false)}>
        {selectedAsset && (
          <FlagMaintenanceForm
            assetId={selectedAsset.id}
            onSuccess={() => {
              refetchAssets();
              setMaintenanceModalOpen(false);
            }}
            onCancel={() => setMaintenanceModalOpen(false)}
          />
        )}
      </Modal>
      <Modal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)}>
        {selectedAsset && (
          <AssetHistoryList assetId={selectedAsset.id} />
        )}
      </Modal>
    </div>
  );
};

export default AssetsPage;