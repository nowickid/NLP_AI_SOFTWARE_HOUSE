const { db } = require('../../db/database');

class Assignment {
  static create(deviceId, employeeId) {
    return new Promise((resolve, reject) => {
      const assignment_date = new Date().toISOString();
      const sql = 'INSERT INTO assignments (device_id, employee_id, assignment_date) VALUES (?,?,?)';
      db.run(sql, [deviceId, employeeId, assignment_date], function (err) {
        if (err) {
          reject(err);
        } else {
          db.get('SELECT * FROM assignments WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      });
    });
  }

  static findLatestByDeviceId(deviceId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM assignments WHERE device_id = ? AND return_date IS NULL ORDER BY assignment_date DESC LIMIT 1';
      db.get(sql, [deviceId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static setReturnDate(assignmentId) {
    return new Promise((resolve, reject) => {
      const return_date = new Date().toISOString();
      const sql = 'UPDATE assignments SET return_date = ? WHERE id = ?';
      db.run(sql, [return_date, assignmentId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  static findByEmployeeId(employeeId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT d.* FROM devices d
        INNER JOIN assignments a ON d.id = a.device_id
        WHERE a.employee_id = ? AND a.return_date IS NULL
      `;
      db.all(sql, [employeeId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static findHistoryByDeviceId(deviceId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT a.*, e.name as employee_name FROM assignments a
        INNER JOIN employees e ON a.employee_id = e.id
        WHERE a.device_id = ?
        ORDER BY a.assignment_date DESC
      `;
      db.all(sql, [deviceId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Assignment;
