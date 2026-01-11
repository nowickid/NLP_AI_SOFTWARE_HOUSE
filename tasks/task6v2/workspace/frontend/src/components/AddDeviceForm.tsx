
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AddDeviceFormProps {
  onDeviceAdded: (device: any) => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onDeviceAdded }) => {
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/devices', {
        type,
        serial_number: serialNumber,
      });
      onDeviceAdded(response.data);
      setType('');
      setSerialNumber('');
      toast.success('Device added successfully!');
    } catch (error) {
      console.error('Error adding device:', error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Add New Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Laptop, Monitor"
            className="input input-bordered"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Serial Number</span>
          </label>
          <input
            type="text"
            placeholder="e.g., SN12345"
            className="input input-bordered"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
            {loading && <span className="loading loading-spinner"></span>}
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeviceForm;
