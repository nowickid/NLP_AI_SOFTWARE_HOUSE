import React, { useState } from 'react';
import AssetList from './components/AssetList';
import AddAssetForm from './components/AddAssetForm';
import AssetHistoryModal from './components/AssetHistoryModal';
import EmployeeManagement from './components/EmployeeManagement';
import AssignmentManagement from './components/AssignmentManagement';
import ReturnAssetForm from './components/ReturnAssetForm';
import MaintenanceForm from './components/MaintenanceForm';

const App: React.FC = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

    const handleViewHistory = (assetId: number) => {
        setSelectedAssetId(assetId);
    };

    const handleCloseModal = () => {
        setSelectedAssetId(null);
    };

    const triggerRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold">Asset Management System</h1>
            </header>
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Add New Asset</h2>
                        <AddAssetForm onAssetAdded={triggerRefresh} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
                        <EmployeeManagement />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Assign Asset</h2>
                        <AssignmentManagement onAssignmentSuccess={triggerRefresh} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Return Asset</h2>
                        <ReturnAssetForm onSuccess={triggerRefresh} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Log Maintenance</h2>
                        <MaintenanceForm onSuccess={triggerRefresh} />
                    </div>
                </div>
                <AssetList refreshKey={refreshKey} onViewHistory={handleViewHistory} />
                {selectedAssetId && <AssetHistoryModal assetId={selectedAssetId} onClose={handleCloseModal} />}
            </main>
        </div>
    );
};

export default App;
