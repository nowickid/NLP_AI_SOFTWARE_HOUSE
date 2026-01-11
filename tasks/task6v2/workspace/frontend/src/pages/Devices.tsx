
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddDeviceForm from '../components/AddDeviceForm';
import AssignDeviceForm from '../components/AssignDeviceForm';
import DeviceHistory from '../components/DeviceHistory';

interface Device {
  id: number;
  name: string;
  type: string;
  serial_number: string;
  status: string;
}

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState<number | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/devices/available');
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast.error('Failed to fetch devices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeviceAdded = () => {
    fetchDevices();
  };

  const handleDeviceAssigned = () => {
    fetchDevices();
  };

  const handleViewHistory = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
  };

  const handleFlagForMaintenance = async (deviceId: number) => {
    setMaintenanceLoading(deviceId);
    try {
      await axios.post(`/api/devices/${deviceId}/maintenance`);
      setDevices(devices.map(device =>
        device.id === deviceId ? { ...device, status: 'maintenance' } : device
      ));
      toast.success('Device flagged for maintenance.');
    } catch (error) {
      console.error('Error flagging device for maintenance:', error);
      toast.error('Something went wrong.');
    } finally {
      setMaintenanceLoading(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Device Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <AddDeviceForm onDeviceAdded={handleDeviceAdded} />
          <div className="mt-4">
            <AssignDeviceForm onDeviceAssigned={handleDeviceAssigned} />
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">All Devices</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Serial Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => (
                    <tr key={device.id}>
                      <th>{index + 1}</th>
                      <td>{device.name}</td>
                      <td>{device.type}</td>
                      <td>{device.serial_number}</td>
                      <td>
                        <span className={`badge ${
                          device.status === 'available' ? 'badge-success' :
                          device.status === 'assigned' ? 'badge-warning' :
                          'badge-error'
                        }`}>{device.status}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info mr-2"
                          onClick={() => handleViewHistory(device.id)}
                        >
                          View History
                        </button>
                        <button
                          className={`btn btn-sm btn-warning ${maintenanceLoading === device.id ? 'btn-disabled' : ''}`}
                          onClick={() => handleFlagForMaintenance(device.id)}
                          disabled={device.status === 'maintenance' || maintenanceLoading === device.id}
                        >
                          {maintenanceLoading === device.id && <span className="loading loading-spinner"></span>}
                          Flag for Maintenance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {selectedDeviceId && <DeviceHistory deviceId={selectedDeviceId} />}
        </div>
      </div>
    </div>
  );
};

export default Devices;
