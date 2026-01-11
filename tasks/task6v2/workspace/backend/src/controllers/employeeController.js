const Employee = require('../models/employee');
const Assignment = require('../models/assignment');

async function createEmployee(req, res) {
    const { name, department } = req.body;
    if (!name || !department) {
        return res.status(400).json({ error: 'Name and department are required' });
    }
    try {
        const employee = await Employee.create(name, department);
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getEmployeeDevices(req, res) {
    const { id } = req.params;
    try {
        const devices = await Assignment.findByEmployeeId(id);
        res.json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeDevices,
};
