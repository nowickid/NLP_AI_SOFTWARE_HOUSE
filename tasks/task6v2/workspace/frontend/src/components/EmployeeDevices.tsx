
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Device {
  id: number;
  type: string;
  serial_number: string;
}

interface EmployeeDevicesProps {
  employeeId: number;
}

const EmployeeDevices: React.FC<EmployeeDevicesProps> = ({ employeeId }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState<number | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/employees/${employeeId}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast.error('Failed to fetch devices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchDevices();
    }
  }, [employeeId]);

  const handleReturnDevice = async (deviceId: number) => {
    setReturnLoading(deviceId);
    try {
      await axios.post(`/api/devices/${deviceId}/return`);
      fetchDevices();
      toast.success('Device returned successfully!');
    } catch (error) {
      console.error('Error returning device:', error);
      toast.error('Something went wrong.');
    } finally {
      setReturnLoading(null);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Assigned Devices</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : devices.length > 0 ? (
        <ul className="space-y-2">
          {devices.map((device) => (
            <li key={device.id} className="flex items-center justify-between p-2 border rounded-md">
              <div>
                <p className="font-semibold">{device.type}</p>
                <p className="text-sm text-gray-500">{device.serial_number}</p>
              </div>
              <button
                onClick={() => handleReturnDevice(device.id)}
                className={`btn btn-sm btn-error ${returnLoading === device.id ? 'btn-disabled' : ''}`}
                disabled={returnLoading === device.id}
              >
                {returnLoading === device.id && <span className="loading loading-spinner"></span>}
                Return
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No devices assigned to this employee.</p>
      )}
    </div>
  );
};

export default EmployeeDevices;
