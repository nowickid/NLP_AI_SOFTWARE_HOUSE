import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import DeviceHistory from './pages/DeviceHistory';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/device-history/:id" element={<DeviceHistory />} />
      </Routes>
    </Layout>
  );
}

export default App;
