const { db } = require('../../db/database');

class Employee {
  static create(name, department) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO employees (name, department) VALUES (?,?)';
      db.run(sql, [name, department], function (err) {
        if (err) {
          reject(err);
        } else {
          db.get('SELECT * FROM employees WHERE id = ?', [this.lastID], (err, row) => {
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
      const sql = 'SELECT * FROM employees WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM employees';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Employee;
