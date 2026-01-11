import React, { useState, useEffect } from 'react';
import { Asset as AssetType } from '../types';
import { getAssets } from '../services/api';
import Asset from './Asset';
import AssignAssetForm from './AssignAssetForm'; // Assuming this component exists

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<AssetType[]>([]);
  // ... other state for loading, error etc.

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const fetchedAssets = await getAssets();
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Failed to fetch assets", error);
      }
    };
    fetchAssets();
  }, []);

  const handleAssetUpdate = (updatedAsset: AssetType) => {
    setAssets(prevAssets => 
      prevAssets.map(asset => 
        asset.id === updatedAsset.id ? updatedAsset : asset
      )
    );
  };

  const assignableAssets = assets.filter(asset => asset.status === 'available');

  // ... other handlers

  return (
    <div>
      <h2>All Assets</h2>
      {assets.map(asset => (
        <Asset key={asset.id} asset={asset} onAssetUpdate={handleAssetUpdate} />
      ))}

      <hr />

      <h2>Assign Asset</h2>
      {/* The form for assigning assets is probably passed a list of assets */}
      <AssignAssetForm assets={assignableAssets} /* ... other props */ />
    </div>
  );
};

export default AssetList;
