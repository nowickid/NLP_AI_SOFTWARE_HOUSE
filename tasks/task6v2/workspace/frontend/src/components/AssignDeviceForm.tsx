
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Employee {
  id: number;
  name: string;
}

interface Device {
  id: number;
  name: string;
}

interface AssignDeviceFormProps {
  onDeviceAssigned: () => void;
}

const AssignDeviceForm: React.FC<AssignDeviceFormProps> = ({ onDeviceAssigned }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeesAndDevices = async () => {
      try {
        const [employeesRes, devicesRes] = await Promise.all([
          axios.get('/api/employees'),
          axios.get('/api/devices/available'),
        ]);
        setEmployees(employeesRes.data);
        setDevices(devicesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch employees and devices.');
      }
    };
    fetchEmployeesAndDevices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedDevice) {
      toast.error('Please select an employee and a device.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/devices/assign', {
        employeeId: selectedEmployee,
        deviceId: selectedDevice,
      });
      onDeviceAssigned();
      setSelectedEmployee('');
      setSelectedDevice('');
      toast.success('Device assigned successfully!');
    } catch (error) {
      console.error('Error assigning device:', error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Assign Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="device" className="block text-sm font-medium text-gray-700">Device</label>
          <select
            id="device"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select a device</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>{device.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
          {loading && <span className="loading loading-spinner"></span>}
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignDeviceForm;
