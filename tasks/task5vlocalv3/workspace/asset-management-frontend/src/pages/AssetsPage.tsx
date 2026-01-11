import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import AddAssetForm from '../components/AddAssetForm';
import { getAssets, createAsset } from '../services/api';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssetAdded = () => {
    setIsModalOpen(false);
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Asset</button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddAssetForm onSuccess={handleAssetAdded} />
        </Modal>
      )}
      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssetsPage;
