import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Asset, addAsset } from '../services/api';

interface AddAssetFormProps {
  onAssetAdded: (asset: Asset) => void;
}

const AddAssetForm: React.FC<AddAssetFormProps> = ({ onAssetAdded }) => {
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newAsset = await addAsset({ type, serial_number: serialNumber });
      onAssetAdded(newAsset);
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="type"
        label="Type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />
      <TextField
        id="serial-number"
        label="Serial Number"
        value={serialNumber}
        onChange={(event) => setSerialNumber(event.target.value)}
      />
      <Button type="submit">Add Asset</Button>
    </Box>
  );
};

export default AddAssetForm;
