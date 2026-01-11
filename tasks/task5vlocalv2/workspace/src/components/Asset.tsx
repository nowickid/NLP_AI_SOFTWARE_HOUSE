import React, { useState } from 'react';
import AssetHistoryModal from './AssetHistoryModal';
import { Asset as AssetType } from '../types';

interface AssetProps {
  asset: AssetType;
}

const Asset: React.FC<AssetProps> = ({ asset }) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleViewHistoryClick = () => {
    setIsHistoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <div className="asset-card">
      <h3>{asset.type}</h3>
      <p>Serial: {asset.serial_number}</p>
      <p>Status: {asset.status}</p>
      {/* Existing buttons for assign, return, etc. would be here */}
      <button onClick={handleViewHistoryClick}>View History</button>
      {isHistoryModalOpen && (
        <AssetHistoryModal
          assetId={asset.id}
          isOpen={isHistoryModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Asset;