import React, { useState } from 'react';
import { Employee } from '../types';
import { TextField, Button, Box } from '@mui/material';

interface AddEmployeeFormProps {
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEmployee({ name, department });
    setName('');
    setDepartment('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  );
};

export default AddEmployeeForm;
