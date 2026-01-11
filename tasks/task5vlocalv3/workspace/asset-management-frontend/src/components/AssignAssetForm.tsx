import React from 'react';
import Modal from './Modal';

const AssignAssetForm = ({ assetId, onSuccess, onCancel }) => {
  const [employeeId, setEmployeeId] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to assign asset to employee
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input type="text" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} />
      </label>
      <button type="submit">Assign</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AssignAssetForm;