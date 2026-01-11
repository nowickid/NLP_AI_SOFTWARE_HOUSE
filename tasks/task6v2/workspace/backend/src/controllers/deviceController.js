const Device = require('../models/device');
const Assignment = require('../models/assignment');

async function createDevice(req, res) {
    const { type, serial_number } = req.body;
    if (!type || !serial_number) {
        return res.status(400).json({ error: 'Type and serial number are required' });
    }
    try {
        const device = await Device.create(type, serial_number);
        res.status(201).json(device);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAvailableDevices(req, res) {
    try {
        const devices = await Device.findAllAvailable();
        console.log("test", devices);
        res.json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function assignDevice(req, res) {
    console.log("Assign Device Called");
    console.log("Request Body:", req.body);
    // Request Body: { employee_id: '1', device_id: '2' }
    const { employeeId , deviceId  } = req.body;
    console.log("Device ID:", deviceId, "Employee ID:", employeeId);
    if (!deviceId || !employeeId) {
        return res.status(400).json({ error: 'Device ID and employee ID are required' });
    }
    try {
        const device = await Device.findById(deviceId);
        if (!device || device.status !== 'available') {
            return res.status(400).json({ error: 'Device is not available for assignment.' });
        }
        await Assignment.create(deviceId, employeeId);
        await Device.updateStatus(deviceId, 'assigned');
        res.status(200).json({ message: 'Device assigned successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function returnDevice(req, res) {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findLatestByDeviceId(id);
        if (!assignment) {
            return res.status(400).json({ error: 'No active assignment found for this device' });
        }
        await Assignment.setReturnDate(assignment.id);
        await Device.updateStatus(id, 'available');
        res.status(200).json({ message: 'Device returned successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function setDeviceMaintenance(req, res) {
    const { id } = req.params;
    try {
        await Device.updateStatus(id, 'maintenance');
        res.status(200).json({ message: 'Device status set to maintenance' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDeviceHistory(req, res) {
    const { id } = req.params;
    try {
        const history = await Assignment.findHistoryByDeviceId(id);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createDevice,
    getAvailableDevices,
    assignDevice,
    returnDevice,
    setDeviceMaintenance,
    getDeviceHistory,
};