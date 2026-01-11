import React from 'react';
import Modal from './Modal';

const FlagMaintenanceForm = ({ assetId, onSuccess, onCancel }) => {
  const [issueDescription, setIssueDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to flag asset for maintenance
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Issue Description:
        <textarea value={issueDescription} onChange={(event) => setIssueDescription(event.target.value)} />
      </label>
      <button type="submit">Flag for Maintenance</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default FlagMaintenanceForm;