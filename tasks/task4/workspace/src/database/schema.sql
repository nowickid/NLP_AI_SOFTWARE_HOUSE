DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT
);

CREATE TABLE assets (
    id INTEGER PRIMARY KEY,
    type TEXT,
    serial_number TEXT UNIQUE,
    status TEXT CHECK(status IN ('available', 'assigned', 'maintenance')) NOT NULL DEFAULT 'available'
);

CREATE TABLE assignments (
    id INTEGER PRIMARY KEY,
    asset_id INTEGER,
    employee_id INTEGER,
    assigned_at TEXT,
    returned_at TEXT,
    FOREIGN KEY(asset_id) REFERENCES assets(id),
    FOREIGN KEY(employee_id) REFERENCES employees(id)
);
