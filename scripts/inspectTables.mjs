import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/hcm_space.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables);

const columns = db.prepare("PRAGMA table_info(hcm_cultural_entries)").all();
console.log('Columns of hcm_cultural_entries:', columns);

const count = db.prepare("SELECT count(*) as total FROM hcm_cultural_entries").get();
console.log('Total entries:', count);
