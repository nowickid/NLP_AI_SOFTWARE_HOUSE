import React, { useState, FC } from 'react';
import { Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { Employee } from '../types';

interface AssignAssetDialogProps {
  open: boolean;
  onClose: () => void;
  onAssign: (employeeId: number) => void;
  employees: Employee[];
  assetName: string;
}

const AssignAssetDialog: FC<AssignAssetDialogProps> = ({ open, onClose, onAssign, employees, assetName }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign {assetName}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Employee</InputLabel>
          <Select
            value={selectedEmployeeId}
            label="Employee"
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={!selectedEmployeeId} onClick={() => onAssign(Number(selectedEmployeeId))}>Confirm Assignment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignAssetDialog;
