import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/hcm_space.db');
const sections = db.prepare("SELECT section, count(*) as count FROM hcm_cultural_entries GROUP BY section").all();
console.log('Sections:', sections);

const sources = db.prepare("SELECT id, name, official_url FROM hcm_sources").all();
console.log('Sources in DB:', sources);
