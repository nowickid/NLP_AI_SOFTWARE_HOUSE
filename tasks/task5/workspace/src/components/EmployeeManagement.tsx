import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  department: string;
}

const EmployeeManagement: React.FC = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, department }),
      });

      if (response.status === 201) {
        const newEmployee: Employee = await response.json();
        setSuccessMessage(`Successfully registered employee ${newEmployee.name} with ID: ${newEmployee.id}`);
        setName('');
        setDepartment('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register employee');
      }
    } catch (error) {
      setError('An error occurred while registering the employee.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
