import React, { useState, useEffect } from 'react';
import { Asset } from './types';
import { Employee } from './types';
import { fetchAssets } from './services/api';
import { fetchEmployees } from './services/api';
import AssetList from './components/AssetList';
import AddAssetForm from './components/AddAssetForm';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadAssets = () => {
    fetchAssets().then(setAssets);
  };

  const loadEmployees = () => {
    fetchEmployees().then(setEmployees);
  };

  useEffect(() => {
    loadAssets();
    loadEmployees();
  }, []);

  return (
    <div>
      <div>
        <h1>Asset Management</h1>
        <AddAssetForm onAssetAdded={loadAssets} />
        <AssetList assets={assets} />
      </div>
      <hr />
      <div>
        <h1>Employee Management</h1>
        <AddEmployeeForm onEmployeeAdded={loadEmployees} />
        <EmployeeList employees={employees} />
      </div>
    </div>
  );
};

export default App;
