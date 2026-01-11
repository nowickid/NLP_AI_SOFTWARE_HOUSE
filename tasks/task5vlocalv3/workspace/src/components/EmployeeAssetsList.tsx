import React from 'react';
import { Employee, Asset } from '../services/api';

interface Props {
  employee: Employee;
  assets: Asset[];
}

const EmployeeAssetsList: React.FC<Props> = ({ employee, assets }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Assets for {employee.name}</h2>
      {assets.length === 0 ? (
        <p>No assets assigned to this employee.</p>
      ) : (
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-4 py-2">{asset.name}</td>
                <td className="px-4 py-2">{asset.type}</td>
                <td className="px-4 py-2">{asset.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeAssetsList;
