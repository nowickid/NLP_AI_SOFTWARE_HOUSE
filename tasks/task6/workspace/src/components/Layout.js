import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Asset Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
