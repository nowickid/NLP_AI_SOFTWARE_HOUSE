import * as models from '../database/models.js';

/**
 * Register a new employee.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const registerEmployee = async (req, res) => {
    try {
        const { name, department } = req.body;
        const result = await models.addEmployee(name, department);
        res.status(201).json({ id: result.lastID, name, department });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while registering the employee.' });
    }
};

/**
 * Add a new asset.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const addNewAsset = async (req, res) => {
    try {
        const { type, serial_number } = req.body;
        const result = await models.addAsset(type, serial_number);
        res.status(201).json({ id: result.lastID, type, serial_number, status: 'available' });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while adding the asset.' });
    }
};

/**
 * List assets, optionally filtering by status.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const listAssets = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status) {
            return res.status(400).json({ error: 'Status query parameter is required.' });
        }
        const assets = await models.findAssetsByStatus(status);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while listing assets.' });
    }
};

/**
 * Get assets assigned to a specific employee.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const getEmployeeAssets = async (req, res) => {
    try {
        const { id } = req.params;
        const assets = await models.findAssetsByEmployee(id);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while retrieving employee assets.' });
    }
};

/**
 * Get the assignment history for a specific asset.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const getAssetHistoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await models.getAssetHistory(id);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while retrieving asset history.' });
    }
};

/**
 * Assign an asset to an employee.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const assignAsset = async (req, res) => {
    try {
        const { asset_id, employee_id } = req.body;
        const asset = await models.findAssetById(asset_id);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found.' });
        }

        if (asset.status !== 'available') {
            return res.status(409).json({ error: `Asset is not available. Current status: ${asset.status}` });
        }

        const result = await models.createAssignment(asset_id, employee_id);
        await models.updateAssetStatus(asset_id, 'assigned');

        res.status(200).json({
            message: 'Asset assigned successfully.',
            assignment_id: result.lastID
        });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while assigning the asset.' });
    }
};

/**
 * Return an asset from an employee.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
export const returnAsset = async (req, res) => {
    try {
        const { asset_id } = req.body;
        const assignment = await models.findCurrentAssignmentByAssetId(asset_id);

        if (!assignment) {
            return res.status(404).json({ error: 'No active assignment found for this asset.' });
        }

        await models.endAssignment(assignment.id);
        await models.updateAssetStatus(asset_id, 'available');

        res.status(200).json({ message: 'Asset returned successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while returning the asset.' });
    }
};

/**
 * Flag an asset for maintenance.
 * @param {object} req - The Express request object..
 * @param {object} res - The Express response object.
 */
export const flagAssetForMaintenance = async (req, res) => {
    try {
        const { asset_id } = req.body;
        await models.updateAssetStatus(asset_id, 'maintenance');
        res.status(200).json({ message: 'Asset has been flagged for maintenance.' });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred while flagging the asset for maintenance.' });
    }
};
