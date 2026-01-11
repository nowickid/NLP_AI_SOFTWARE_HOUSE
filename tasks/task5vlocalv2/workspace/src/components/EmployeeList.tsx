import React from 'react';
import { Employee } from '../types';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} ({employee.department})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
