const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id/devices', employeeController.getEmployeeDevices);

module.exports = router;
