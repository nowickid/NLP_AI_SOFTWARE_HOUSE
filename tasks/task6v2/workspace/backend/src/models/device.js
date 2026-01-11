const { db } = require('../../db/database');

class Device {
  static create(type, serial_number) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO devices (type, serial_number, status) VALUES (?,?,?)';
      const status = 'available';
      db.run(sql, [type, serial_number, status], function (err) {
        if (err) {
          reject(err);
        } else {
          db.get('SELECT * FROM devices WHERE id = ?', [this.lastID], (err, row) => {
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

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM devices WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findAllAvailable() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM devices WHERE status = 'available'";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE devices SET status = ? WHERE id = ?';
      db.run(sql, [status, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = Device;
