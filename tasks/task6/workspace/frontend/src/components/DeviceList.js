import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const DeviceList = ({ devices }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.type}</TableCell>
              <TableCell>{device.serialNumber}</TableCell>
              <TableCell>{device.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceList;
