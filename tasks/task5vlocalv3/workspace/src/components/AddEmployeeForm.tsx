import { useState } from 'react';

interface AddEmployeeFormProps {
  onSubmit: (data: { name: string; department: string }) => void;
}

const AddEmployeeForm = ({ onSubmit }: AddEmployeeFormProps) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, department });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
          Department
        </label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
