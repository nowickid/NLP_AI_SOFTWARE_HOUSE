import { db } from './database.js';

/**
 * Helper function to run a SELECT query and get a single row.
 * @param {string} sql The SQL query.
 * @param {Array} params The parameters for the query.
 * @returns {Promise<Object>} A promise that resolves with the row.
 */
const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

/**
 * Helper function to run a SELECT query and get all rows.
 * @param {string} sql The SQL query.
 * @param {Array} params The parameters for the query.
 * @returns {Promise<Array>} A promise that resolves with the rows.
 */
const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Database error:', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Helper function to run an INSERT, UPDATE, or DELETE query.
 * @param {string} sql The SQL query.
 * @param {Array} params The parameters for the query.
 * @returns {Promise<Object>} A promise that resolves with the result.
 */
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error('Database error:', err.message);
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};


/**
 * Employees
 */
export const addEmployee = (name, department) => {
  const sql = 'INSERT INTO employees (name, department) VALUES (?, ?)';
  return run(sql, [name, department]);
};

/**
 * Assets
 */
export const addAsset = (type, serial_number) => {
  const sql = 'INSERT INTO assets (type, serial_number) VALUES (?, ?)';
  return run(sql, [type, serial_number]);
};

export const findAssetById = (assetId) => {
    const sql = 'SELECT * FROM assets WHERE id = ?';
    return get(sql, [assetId]);
};

export const findAssetsByStatus = (status) => {
  const sql = 'SELECT * FROM assets WHERE status = ?';
  return all(sql, [status]);
};

export const findAssetsByEmployee = (employeeId) => {
    const sql = `
        SELECT a.* 
        FROM assets a
        JOIN assignments ag ON a.id = ag.asset_id
        WHERE ag.employee_id = ? AND ag.returned_at IS NULL
    `;
    return all(sql, [employeeId]);
};

export const getAssetHistory = (assetId) => {
    const sql = `
        SELECT ag.id as assignment_id, ag.assigned_at, ag.returned_at, e.name as employee_name, e.department 
        FROM assignments ag 
        JOIN employees e ON ag.employee_id = e.id 
        WHERE ag.asset_id = ? 
        ORDER BY ag.assigned_at DESC
    `;
    return all(sql, [assetId]);
};

export const updateAssetStatus = (assetId, status) => {
  const sql = 'UPDATE assets SET status = ? WHERE id = ?';
  return run(sql, [status, assetId]);
};

/**
 * Assignments
 */
export const createAssignment = async (assetId, employeeId) => {
    await updateAssetStatus(assetId, 'assigned');
    const sql = 'INSERT INTO assignments (asset_id, employee_id) VALUES (?, ?)';
    return run(sql, [assetId, employeeId]);
};

export const findCurrentAssignmentByAssetId = (assetId) => {
    const sql = 'SELECT * FROM assignments WHERE asset_id = ? AND returned_at IS NULL';
    return get(sql, [assetId]);
};

export const endAssignment = async (assignmentId) => {
    const assignment = await get('SELECT asset_id FROM assignments WHERE id = ?', [assignmentId]);
    if (!assignment) {
        throw new Error('Assignment not found');
    }
    
    await updateAssetStatus(assignment.asset_id, 'available');
    const sql = 'UPDATE assignments SET returned_at = CURRENT_TIMESTAMP WHERE id = ?';
    return run(sql, [assignmentId]);
};
