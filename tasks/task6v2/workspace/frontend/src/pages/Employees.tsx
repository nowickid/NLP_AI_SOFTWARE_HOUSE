
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeDevices from '../components/EmployeeDevices';

interface Employee {
  id: number;
  name: string;
  department: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewingDevices, setViewingDevices] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const handleViewDevices = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="mb-8">
        <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <th>Department</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <th>{index + 1}</th>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>
                      <button
                        onClick={() => handleViewDevices(employee.id)}
                        className={`btn btn-sm btn-primary ${viewingDevices && selectedEmployeeId === employee.id ? 'btn-disabled' : ''}`}
                      >
                        {viewingDevices && selectedEmployeeId === employee.id && <span className="loading loading-spinner"></span>}
                        View Devices
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {selectedEmployeeId && <EmployeeDevices employeeId={selectedEmployeeId} />}
        </div>
      </div>
    </div>
  );
};

export default Employees;
