import React from 'react';
import { Asset as AssetType } from '../types';
import { flagForMaintenance } from '../services/api';

interface AssetProps {
  asset: AssetType;
  onAssetUpdate: (updatedAsset: AssetType) => void;
}

const Asset: React.FC<AssetProps> = ({ asset, onAssetUpdate }) => {
  const handleReturn = async () => {
    // ... implementation for returning an asset
  };

  const handleFlagForMaintenance = async () => {
    try {
      const updatedAsset = await flagForMaintenance(asset.id);
      onAssetUpdate(updatedAsset);
    } catch (error) {
      console.error('Error flagging asset for maintenance:', error);
    }
  };

  return (
    <div>
      <p>{asset.type} - {asset.serial_number} ({asset.status})</p>
      {asset.status === 'assigned' && (
        <button onClick={handleReturn}>Return</button>
      )}
      {asset.status !== 'maintenance' && (
        <button onClick={handleFlagForMaintenance}>Flag for Maintenance</button>
      )}
    </div>
  );
};

export default Asset;
