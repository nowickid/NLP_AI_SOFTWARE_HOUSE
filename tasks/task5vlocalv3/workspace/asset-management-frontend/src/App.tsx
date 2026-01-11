import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AssetsPage from './pages/AssetsPage';
import EmployeesPage from './pages/EmployeesPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/assets" replace />} />
        <Route path="/assets" element={<Layout><AssetsPage /></Layout>} />
        <Route path="/employees" element={<Layout><EmployeesPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
