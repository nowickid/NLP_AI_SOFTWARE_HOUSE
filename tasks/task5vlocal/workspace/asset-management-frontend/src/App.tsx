import React from 'react';
import AssetList from './components/AssetList';
import EmployeeList from './components/EmployeeList';
import { Container, Typography, Grid } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Asset Management Application
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AssetList />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmployeeList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;