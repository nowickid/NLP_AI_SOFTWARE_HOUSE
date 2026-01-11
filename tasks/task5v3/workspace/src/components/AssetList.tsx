import { useState, useEffect } from 'react';
import { Asset as AssetType } from '../types';
import { fetchAssets } from '../services/api';
import Asset from './Asset';
import styles from './AssetList.module.css';

const AssetList = () => {
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getAssets = async () => {
      setLoading(true);
      try {
        const data = await fetchAssets(filter);
        setAssets(data);
      } catch (err) {
        setError('Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };

    getAssets();
  }, [filter]);

  const handleFilterChange = (status?: string) => {
    setFilter(status);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.assetList}>
      <h2>Asset List</h2>
      <div className={styles.filters}>
        <button onClick={() => handleFilterChange(undefined)}>All</button>
        <button onClick={() => handleFilterChange('available')}>Available</button>
        <button onClick={() => handleFilterChange('assigned')}>Assigned</button>
        <button onClick={() => handleFilterChange('maintenance')}>Maintenance</button>
      </div>
      {assets.map(asset => (
        <Asset key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
