import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Employee } from '../types';

interface EmployeeComponentProps {
  employee: Employee;
}

const EmployeeComponent: React.FC<EmployeeComponentProps> = ({ employee }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {employee.name.charAt(0)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={employee.name} secondary={employee.department} />
    </ListItem>
  );
};

export default EmployeeComponent;
