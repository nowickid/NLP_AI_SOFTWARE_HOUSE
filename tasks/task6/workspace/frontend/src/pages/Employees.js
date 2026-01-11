import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/api';
import EmployeeList from '../components/EmployeeList';
import { CircularProgress, Typography } from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <EmployeeList employees={employees} />
    </div>
  );
};

export default Employees;
