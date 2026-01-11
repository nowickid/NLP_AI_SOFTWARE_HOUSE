import React, { useEffect, useState } from 'react';
import { fetchEmployees, addEmployee } from '../services/api';
import { Employee } from '../types';
import EmployeeComponent from './Employee';
import AddEmployeeForm from './AddEmployeeForm';
import { List, CircularProgress, Container, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);
      } catch (error) {
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  const handleAddEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await addEmployee(employee);
      setEmployees([...employees, newEmployee]);
      setOpen(false);
    } catch (error) {
      setError('Error adding employee');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Employee
      </Button>
      <List>
        {employees.map((employee) => (
          <EmployeeComponent key={employee.id} employee={employee} />
        ))}
      </List>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <AddEmployeeForm onAddEmployee={handleAddEmployee} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default EmployeeList;
