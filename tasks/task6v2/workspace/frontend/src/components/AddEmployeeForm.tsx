
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AddEmployeeFormProps {
  onEmployeeAdded: (employee: any) => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/employees', { name, department });
      onEmployeeAdded(response.data);
      setName('');
      setDepartment('');
      toast.success('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-sm">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Department</span>
        </label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
          {loading && <span className="loading loading-spinner"></span>}
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
