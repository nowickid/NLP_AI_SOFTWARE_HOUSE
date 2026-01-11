import { useState, useEffect } from 'react';
import Asset from './Asset';
import { Asset as AssetType } from '../types';
import { fetchAssets } from '../services/api';
import { Container, Typography, Box, CircularProgress, Alert, Grid } from '@mui/material';

function AssetList() {
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets()
      .then(data => {
        setAssets(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Asset List
      </Typography>
      <Grid container spacing={2}>
        {assets.map(asset => (
          <Grid item key={asset.id} xs={12} sm={6} md={4}>
            <Asset asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AssetList;