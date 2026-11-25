import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const dbCache = new Map<string, DatabaseSync>();

export function resolveDbFilePath(customPath?: string): string {
  if (customPath) return path.resolve(customPath);
  if (process.env.HCM_DB_FILE) return path.resolve(process.env.HCM_DB_FILE);
  return path.join(process.cwd(), 'data', 'hcm_space.db');
}

export function getSqliteDb(customPath?: string): DatabaseSync {
  const filePath = resolveDbFilePath(customPath);
  const cached = dbCache.get(filePath);
  if (cached) return cached;

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(filePath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = ON;
    PRAGMA busy_timeout = 5000;
  `);

  dbCache.set(filePath, db);
  return db;
}

export function closeSqliteDb(customPath?: string): void {
  const filePath = resolveDbFilePath(customPath);
  const db = dbCache.get(filePath);
  if (db) {
    try {
      db.close();
    } catch {
      // ignore
    }
    dbCache.delete(filePath);
  }
}

export function withSqliteTransaction<T>(db: DatabaseSync, fn: () => T): T {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    try {
      db.exec('ROLLBACK');
    } catch {
      // ignore rollback err
    }
    throw err;
  }
}
