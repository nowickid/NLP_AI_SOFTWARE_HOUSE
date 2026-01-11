import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface MaintenanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (issueDescription: string) => void;
}

const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({ open, onClose, onSubmit }) => {
  const [issueDescription, setIssueDescription] = useState('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(issueDescription);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Flag for Maintenance</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Issue Description"
          multiline
          rows={4}
          fullWidth
          value={issueDescription}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!issueDescription}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaintenanceDialog;
