import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/hcm_space.db');
console.log('Columns of hcm_sources:', db.prepare("PRAGMA table_info(hcm_sources)").all());
console.log('Rows in hcm_sources:', db.prepare("SELECT * FROM hcm_sources").all());
