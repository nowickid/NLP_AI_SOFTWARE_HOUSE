import express from 'express';
const router = express.Router();

import {
  registerEmployee,
  getEmployeeAssets,
  addNewAsset,
  listAssets,
  getAssetHistoryController,
  assignAsset,
  returnAsset,
  flagAssetForMaintenance,
} from '../controllers/assetController.js';

// Employee routes
router.post('/employees', registerEmployee);
router.get('/employees/:id/assets', getEmployeeAssets);

// Asset routes
router.post('/assets', addNewAsset);
router.get('/assets', listAssets);
router.get('/assets/:id/history', getAssetHistoryController);

// Asset management routes
router.post('/assignments', assignAsset);
router.post('/returns', returnAsset);
router.post('/maintenance', flagAssetForMaintenance);

export default router;
