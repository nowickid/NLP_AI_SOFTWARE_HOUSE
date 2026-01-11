import React from 'react';
import { Container, Typography } from '@mui/material';
import AssetList from './components/AssetList';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" mb={4}>Asset Management</Typography>
      <AssetList />
    </Container>
  );
};

export default App;
