import { useEffect, useState } from 'react';
import { getEmployees, createEmployee, getEmployeeAssets } from '../services/api';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeAssetsList from '../components/EmployeeAssetsList';

interface Employee {
  id: number;
  name: string;
  department: string;
}

interface Asset {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewAssetsModalOpen, setIsViewAssetsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeAssets, setEmployeeAssets] = useState<Asset[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employeeData: { name: string; department: string }) => {
    try {
      await createEmployee(employeeData);
      fetchEmployees(); // Refresh the list
      setIsAddModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleViewAssets = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsLoadingAssets(true);
    setIsViewAssetsModalOpen(true);
    try {
      const assets = await getEmployeeAssets(employee.id);
      setEmployeeAssets(assets);
    } catch (error) {
      console.error("Error fetching employee assets:", error);
    } finally {
      setIsLoadingAssets(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Employees</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Employee
          </button>
        </div>
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{employee.name}</td>
                  <td className="py-3 px-6 text-left">{employee.department}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleViewAssets(employee)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Assets
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddEmployeeForm onSubmit={handleAddEmployee} />
      </Modal>
      <Modal
        isOpen={isViewAssetsModalOpen}
        onClose={() => {
          setIsViewAssetsModalOpen(false);
          setSelectedEmployee(null);
          setEmployeeAssets([]);
        }}
      >
        {isLoadingAssets ? (
          <p>Loading...</p>
        ) : selectedEmployee ? (
          <EmployeeAssetsList employee={selectedEmployee} assets={employeeAssets} />
        ) : null}
      </Modal>
    </Layout>
  );
};

export default EmployeesPage;
