import React, { useEffect, useState } from 'react';
import { getAssets, getEmployees, assignAsset, returnAsset, addAsset, setMaintenance, clearMaintenance, disposeAsset, getAssetHistory } from '../services/api';
import { Asset as AssetType, Employee, AssignmentHistory } from '../types';
import Asset from './Asset';
import AssignAssetDialog from './AssignAssetDialog';
import AddAssetForm from './AddAssetForm';
import { Container, Typography, Alert } from '@mui/material';
import MaintenanceDialog from './MaintenanceDialog';
import AssetHistoryDialog from './AssetHistoryDialog';

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState<boolean>(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);
  const [historyDialogOpen, setHistoryDialogOpen] = useState<boolean>(false);
  const [historyData, setHistoryData] = useState<AssignmentHistory[] | null>(null);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assetsData, employeesData] = await Promise.all([getAssets(), getEmployees()]);
      setAssets(assetsData);
      setEmployees(employeesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = (asset: AssetType) => {
    setSelectedAsset(asset);
    setAssignDialogOpen(true);
  };

  const handleReturn = async (assetId: number) => {
    try {
      await returnAsset(assetId);
      fetchData();
    } catch (err) {
      setError('Failed to return asset');
    }
  };

  const handleConfirmAssign = async (employeeId: number) => {
    if (selectedAsset) {
      try {
        await assignAsset(selectedAsset.id, employeeId);
        setAssignDialogOpen(false);
        setSelectedAsset(null);
        fetchData();
      } catch (err) {
        setError('Failed to assign asset');
      }
    }
  };

  const handleAddAsset = async (asset: Omit<AssetType, 'id' | 'status' | 'assigned_to' | 'maintenance_notes'>) => {
    try {
      await addAsset(asset);
      fetchData();
    } catch (err) {
      setError('Failed to add asset');
    }
  };

  const handleSetMaintenance = (asset: AssetType) => {
    setSelectedAsset(asset);
    setMaintenanceDialogOpen(true);
  };

  const handleConfirmSetMaintenance = async (notes: string) => {
    if (selectedAsset) {
      try {
        await setMaintenance(selectedAsset.id, notes);
        setMaintenanceDialogOpen(false);
        setSelectedAsset(null);
        fetchData();
      } catch (err) {
        setError('Failed to set maintenance');
      }
    }
  };

  const handleClearMaintenance = async (assetId: number) => {
    try {
      await clearMaintenance(assetId);
      fetchData();
    } catch (err) {
      setError('Failed to clear maintenance');
    }
  };

  const handleDispose = async (assetId: number) => {
    try {
      await disposeAsset(assetId);
      fetchData();
    } catch (err) {
      setError('Failed to dispose asset');
    }
  };

  const handleViewHistory = async (assetId: number) => {
    setHistoryDialogOpen(true);
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const history = await getAssetHistory(assetId);
      setHistoryData(history);
    } catch (err) {
      setHistoryError('Failed to fetch asset history');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCloseHistoryDialog = () => {
    setHistoryDialogOpen(false);
    setHistoryData(null);
    setHistoryError(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Asset Management
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <AddAssetForm onAddAsset={handleAddAsset} />
      {assets.map((asset) => (
        <Asset
          key={asset.id}
          asset={asset}
          onAssign={handleAssign}
          onReturn={handleReturn}
          onSetMaintenance={handleSetMaintenance}
          onClearMaintenance={handleClearMaintenance}
          onDispose={handleDispose}
          onViewHistory={handleViewHistory}
        />
      ))}
      <AssignAssetDialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        onAssign={handleConfirmAssign}
        employees={employees}
      />
      <MaintenanceDialog
        open={maintenanceDialogOpen}
        onClose={() => setMaintenanceDialogOpen(false)}
        onConfirm={handleConfirmSetMaintenance}
      />
      <AssetHistoryDialog
        open={historyDialogOpen}
        onClose={handleCloseHistoryDialog}
        history={historyData}
        loading={historyLoading}
        error={historyError}
      />
    </Container>
  );
};

export default AssetList;
