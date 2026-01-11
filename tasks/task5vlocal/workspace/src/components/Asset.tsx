import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Chip } from '@mui/material';
import { Asset as AssetType } from '../types';

interface AssetProps {
  asset: AssetType;
  onAssign: (asset: AssetType) => void;
  onReturn: (assetId: number) => void;
  onSetMaintenance: (asset: AssetType) => void;
  onClearMaintenance: (assetId: number) => void;
  onDispose: (assetId: number) => void;
  onViewHistory: (assetId: number) => void;
}

const Asset: React.FC<AssetProps> = ({ asset, onAssign, onReturn, onSetMaintenance, onClearMaintenance, onDispose, onViewHistory }) => {
  const getStatusChip = (status: AssetType['status']) => {
    switch (status) {
      case 'in_stock':
        return <Chip label="In Stock" color="success" />;
      case 'assigned':
        return <Chip label="Assigned" color="primary" />;
      case 'in_maintenance':
        return <Chip label="In Maintenance" color="warning" />;
      case 'disposed':
        return <Chip label="Disposed" color="error" />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {asset.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {getStatusChip(asset.status)}
        </Typography>
        <Typography variant="body2">
          {asset.description}
        </Typography>
        {asset.maintenance_notes && (
            <Typography variant="body2" color="error" sx={{ mt: 1}}>
                Maintenance Notes: {asset.maintenance_notes}
            </Typography>
        )}
      </CardContent>
      <CardActions>
        {asset.status === 'in_stock' && <Button size="small" onClick={() => onAssign(asset)}>Assign</Button>}
        {asset.status === 'assigned' && <Button size="small" onClick={() => onReturn(asset.id)}>Return</Button>}
        {asset.status !== 'disposed' && asset.status !== 'in_maintenance' && <Button size="small" onClick={() => onSetMaintenance(asset)}>Set Maintenance</Button>}
        {asset.status === 'in_maintenance' && <Button size="small" onClick={() => onClearMaintenance(asset.id)}>Clear Maintenance</Button>}
        {asset.status !== 'disposed' && <Button size="small" onClick={() => onDispose(asset.id)}>Dispose</Button>}
        <Button size="small" onClick={() => onViewHistory(asset.id)}>View History</Button>
      </CardActions>
    </Card>
  );
};

export default Asset;
