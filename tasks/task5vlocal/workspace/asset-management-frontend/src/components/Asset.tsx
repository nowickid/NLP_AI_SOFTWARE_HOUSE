import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Asset as AssetType } from '../types';

const statusColor = (status: AssetType['status']) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'assigned':
      return 'primary';
    case 'maintenance':
      return 'warning';
    default:
      return 'error';
  }
};

interface AssetProps {
  asset: AssetType;
}

function Asset({ asset }: AssetProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Asset Details</Typography>
        <Typography variant="subtitle1"><strong>Type:</strong> {asset.type}</Typography>
        <Typography variant="subtitle1"><strong>Serial Number:</strong> {asset.serial_number}</Typography>
        <Typography variant="subtitle1">
          <strong>Status:</strong>
          <Chip label={asset.status} color={statusColor(asset.status)} />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Asset;
