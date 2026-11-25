import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/hcm_space.db');
const sessionCount = db.prepare('SELECT COUNT(*) as count FROM hcm_visitor_sessions').get().count;
console.log('Real session count:', sessionCount);

const nowIso = new Date().toISOString();
db.prepare('UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = ?').run(sessionCount, nowIso, 'total_visits');
db.prepare('UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = ?').run(sessionCount, nowIso, 'today_visits');
db.prepare('UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = ?').run(sessionCount, nowIso, 'month_visits');

const rows = db.prepare('SELECT * FROM hcm_visitor_metrics').all();
console.log('Updated metrics:', rows);
