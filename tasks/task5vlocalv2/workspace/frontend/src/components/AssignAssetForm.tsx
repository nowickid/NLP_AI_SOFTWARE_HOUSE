import React, { useState, useEffect } from 'react';
import { getAssets, getEmployees, assignAsset } from '../services/api';

interface AssignAssetFormProps {
  onAssetAssigned: () => void;
}

const AssignAssetForm: React.FC<AssignAssetFormProps> = ({ onAssetAssigned }) => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  useEffect(() => {
    const fetchAssetsAndEmployees = async () => {
      try {
        const assetsResponse = await getAssets();
        const employeesResponse = await getEmployees();
        setAssets(assetsResponse);
        setEmployees(employeesResponse);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssetsAndEmployees();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await assignAsset(selectedAssetId, selectedEmployeeId);
      onAssetAssigned();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedAssetId}
        onChange={(event) => setSelectedAssetId(event.target.value)}
      >
        <option value=''>Select an asset</option>
        {assets
          .filter((asset) => asset.status === 'available')
          .map((asset) => (
            <option key={asset.id} value={asset.id}>{`${asset.type} - ${asset.serial_number}`}</option>
          ))}
      </select>
      <select
        value={selectedEmployeeId}
        onChange={(event) => setSelectedEmployeeId(event.target.value)}
      >
        <option value=''>Select an employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>{employee.name}</option>
        ))}
      </select>
      <button type='submit'>Assign Asset</button>
    </form>
  );
};

export default AssignAssetForm;
