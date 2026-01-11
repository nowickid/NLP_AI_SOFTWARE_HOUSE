import express from 'express';
import apiRouter from './routes/api.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the API router
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export for potential testing
