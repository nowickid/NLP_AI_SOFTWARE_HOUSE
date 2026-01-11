import React, { useState } from 'react';
import { addEmployee } from '../services/api';

interface AddEmployeeFormProps {
  onEmployeeAdded: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addEmployee(name, department);
      onEmployeeAdded();
      setName('');
      setDepartment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Department:
        <input type="text" value={department} onChange={(event) => setDepartment(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;