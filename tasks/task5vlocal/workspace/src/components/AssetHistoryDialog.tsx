import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, List, ListItem, ListItemText, Alert } from '@mui/material';

interface AssetHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  history: AssignmentHistory[] | null;
  loading: boolean;
  error: string | null;
}

const AssetHistoryDialog: React.FC<AssetHistoryDialogProps> = ({ open, onClose, history, loading, error }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asset Assignment History</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : history && history.length > 0 ? (
          <List>
            {history.map((item) => (
              <ListItem key={item.assignment_id}>
                <ListItemText
                  primary={item.employee_name}
                  secondary={`Assigned: ${item.assigned_at} - ${item.returned_at === null ? 'Currently Assigned' : `Returned: ${item.returned_at}`}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No assignment history available for this asset.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetHistoryDialog;
