import React, { useState, useEffect } from 'react';
import { getAvailableDevices } from '../services/api';
import DeviceList from '../components/DeviceList';
import { Typography } from '@mui/material';

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAvailableDevices();
        setDevices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching devices');
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {loading && <p>Loading devices...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <DeviceList devices={devices} />}
    </div>
  );
};

export default Dashboard;
