const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'asset_management.db');
const DBSOURCE = process.env.NODE_ENV === 'test' ? ':memory:' : dbPath;

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
});

const createTables = (callback) => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            serial_number TEXT NOT NULL UNIQUE,
            status TEXT NOT NULL DEFAULT 'available'
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id INTEGER,
            employee_id INTEGER,
            assignment_date TEXT,
            return_date TEXT,
            FOREIGN KEY (device_id) REFERENCES devices (id),
            FOREIGN KEY (employee_id) REFERENCES employees (id)
        )`, (err) => {
            callback(err);
        });
    });
};

module.exports = { db, createTables };
