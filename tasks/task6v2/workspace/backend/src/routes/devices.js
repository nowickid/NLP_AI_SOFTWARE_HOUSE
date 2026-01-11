const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.createDevice);
router.get('/available', deviceController.getAvailableDevices);
router.post('/assign', deviceController.assignDevice);
router.post('/:id/return', deviceController.returnDevice);
router.post('/:id/maintenance', deviceController.setDeviceMaintenance);
router.get('/:id/history', deviceController.getDeviceHistory);

module.exports = router;