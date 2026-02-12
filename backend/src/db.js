import initSqlJs from 'sql.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'hospital.db');

const SQL = await initSqlJs();
let db;
if (fs.existsSync(dbPath)) {
  const buf = fs.readFileSync(dbPath);
  db = new SQL.Database(buf);
} else {
  db = new SQL.Database();
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

function rowsToObjects(columns, values) {
  return values.map((row) => {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

function run(sql, params = []) {
  db.run(sql, params);
  saveDb();
  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result.length && result[0].values[0] ? result[0].values[0][0] : 0;
  return { lastInsertRowid: id, changes: db.getRowsModified() };
}

function get(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return undefined;
}

function all(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  return results;
}

// Schema
db.run(`
  CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    pincode TEXT,
    phone TEXT,
    email TEXT,
    description TEXT,
    image_url TEXT,
    facilities TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS specialities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    speciality_id INTEGER NOT NULL,
    qualification TEXT,
    experience_years INTEGER,
    bio TEXT,
    image_url TEXT,
    consultation_fee INTEGER,
    available_days TEXT,
    branch_ids TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (speciality_id) REFERENCES specialities(id)
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS opd_slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    slot_date DATE NOT NULL,
    slot_time TEXT NOT NULL,
    is_available INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    UNIQUE(branch_id, doctor_id, slot_date, slot_time)
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    doctor_id INTEGER NOT NULL,
    branch_id INTEGER NOT NULL,
    slot_date DATE NOT NULL,
    slot_time TEXT NOT NULL,
    status TEXT DEFAULT 'confirmed',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
saveDb();

const dbWrapper = {
  prepare(sql) {
    return {
      run(...params) { return run(sql, params); },
      get(...params) { return get(sql, params); },
      all(...params) { return all(sql, params); },
    };
  },
  run(sql, params = []) { return run(sql, params); },
  get(sql, params = []) { return get(sql, params); },
  all(sql, params = []) { return all(sql, params); },
};

export default dbWrapper;
