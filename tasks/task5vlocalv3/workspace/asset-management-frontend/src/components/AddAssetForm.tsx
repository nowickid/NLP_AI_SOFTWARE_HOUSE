import React, { useState } from 'react';
import Modal from './Modal';
import { createAsset } from '../services/api';

interface AddAssetFormProps {
  onSuccess: () => void;
}

const AddAssetForm: React.FC<AddAssetFormProps> = ({ onSuccess }) => {
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const newAsset = await createAsset({ type, serial_number: serialNumber });
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input type="text" value={type} onChange={(event) => setType(event.target.value)} />
        <br />
        <label>Serial Number:</label>
        <input type="text" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>Add Asset</button>
      </form>
    </Modal>
  );
};

export default AddAssetForm;
