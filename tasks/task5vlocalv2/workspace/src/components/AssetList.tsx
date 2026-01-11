import React, { useEffect, useState } from 'react';
import { getAssets } from '../services/api';
import { Asset as AssetType } from '../types';
import Asset from './Asset';

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<AssetType[]>([]);

  const handleAssetUpdate = (updatedAsset: AssetType) => {
    setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assets = await getAssets();
        setAssets(assets);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div>
      <h2>Assets</h2>
      {assets.map(asset => (
        <Asset key={asset.id} asset={asset} onAssetUpdate={handleAssetUpdate} />
      ))}
    </div>
  );
};

export default AssetList;