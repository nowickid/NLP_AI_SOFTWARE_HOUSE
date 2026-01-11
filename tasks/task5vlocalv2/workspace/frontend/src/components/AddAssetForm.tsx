import React, { useState } from 'react';
import { fetchAssets } from '../services/api';

const AddAssetForm: React.FC<{ onAssetAdded: (asset: any) => void }> = ({ onAssetAdded }) => {
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newAsset = await fetchAssets(type, serialNumber);
      onAssetAdded(newAsset);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" value={type} onChange={(event) => setType(event.target.value)} />
      </label>
      <br />
      <label>
        Serial Number:
        <input type="text" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Asset</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddAssetForm;
