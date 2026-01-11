import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : path.resolve(__dirname, '../../assets.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema:', err.message);
    } else {
      console.log('Database schema initialized successfully.');
    }
  });
}

export const initializeDb = initializeDatabase;
