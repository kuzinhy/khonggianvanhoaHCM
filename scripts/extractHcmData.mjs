import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const srcDbPath = 'D:/Du_an/tuyengiaoso/data/tuyengiaoso.db';
const destDbDir = path.resolve('data');
const destDbPath = path.join(destDbDir, 'hcm_space.db');

if (!fs.existsSync(destDbDir)) {
  fs.mkdirSync(destDbDir, { recursive: true });
}

console.log('Connecting to source database:', srcDbPath);
const srcDb = new DatabaseSync(srcDbPath, { readOnly: true });

// Check destination database
console.log('Target database path:', destDbPath);
const destDb = new DatabaseSync(destDbPath);

destDb.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;
  PRAGMA foreign_keys = ON;
`);

// 1. Copy workspace_meta HCM keys
destDb.exec(`
  CREATE TABLE IF NOT EXISTS workspace_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const metaRows = srcDb.prepare("SELECT * FROM workspace_meta WHERE key LIKE '%hcm%'").all();
console.log(`Exporting ${metaRows.length} workspace_meta keys related to HCM...`);
const insertMeta = destDb.prepare("INSERT OR REPLACE INTO workspace_meta (key, value, updated_at) VALUES (?, ?, ?)");
for (const row of metaRows) {
  insertMeta.run(row.key, row.value, row.updated_at || new Date().toISOString());
}

// 2. Find all tables and views starting with hcm_
const schemaItems = srcDb.prepare("SELECT type, name, sql FROM sqlite_master WHERE name LIKE 'hcm_%' AND sql IS NOT NULL").all();

for (const item of schemaItems) {
  if (item.type === 'table') {
    console.log(`Migrating table schema: ${item.name}`);
    destDb.exec(`DROP TABLE IF EXISTS ${item.name};`);
    destDb.exec(item.sql);

    // Copy rows
    const rows = srcDb.prepare(`SELECT * FROM ${item.name}`).all();
    console.log(`  -> Migrating ${rows.length} rows for ${item.name}...`);
    
    // Save to JSON backup file
    const jsonPath = path.join(destDbDir, `${item.name}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2), 'utf-8');
    console.log(`  -> Exported to JSON: ${jsonPath}`);

    if (rows.length > 0) {
      const cols = Object.keys(rows[0]);
      const placeholders = cols.map(() => '?').join(', ');
      const colNames = cols.map(c => `"${c}"`).join(', ');
      const insertStmt = destDb.prepare(`INSERT OR REPLACE INTO ${item.name} (${colNames}) VALUES (${placeholders})`);
      
      for (const r of rows) {
        insertStmt.run(...cols.map(c => r[c]));
      }
    }
  } else if (item.type === 'index') {
    try {
      destDb.exec(item.sql);
    } catch (e) {
      // index might already exist
    }
  }
}

console.log('✅ HCM Space Database extraction completed successfully!');
