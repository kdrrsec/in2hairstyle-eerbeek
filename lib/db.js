import { Pool } from 'pg';

const globalForPg = globalThis;

export const pool =
  globalForPg._pgPool ||
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== 'production') {
  globalForPg._pgPool = pool;
}

const DEFAULT_TREATMENTS = [
  { name: 'Knippen', duration_minutes: 30, price_from: 27.5, sort_order: 1 },
  { name: 'Baard', duration_minutes: 15, price_from: 17.5, sort_order: 2 },
  { name: 'Knippen + Baard', duration_minutes: 45, price_from: 42.5, sort_order: 3 },
  { name: 'Knippen kind (t/m 12 jaar)', duration_minutes: 30, price_from: 22.5, sort_order: 4 },
];

let schemaReady = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS treatments (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          duration_minutes INT NOT NULL,
          price_from NUMERIC(6,2) NOT NULL,
          sort_order INT NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS appointments (
          id SERIAL PRIMARY KEY,
          treatment_id INT NOT NULL REFERENCES treatments(id),
          customer_name TEXT NOT NULL,
          customer_phone TEXT NOT NULL,
          customer_email TEXT,
          start_time TIMESTAMPTZ NOT NULL,
          end_time TIMESTAMPTZ NOT NULL,
          status TEXT NOT NULL DEFAULT 'confirmed',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS blocked_slots (
          id SERIAL PRIMARY KEY,
          start_time TIMESTAMPTZ NOT NULL,
          end_time TIMESTAMPTZ NOT NULL,
          reason TEXT
        );
      `);

      const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM treatments');
      if (rows[0].count === 0) {
        for (const t of DEFAULT_TREATMENTS) {
          await pool.query(
            'INSERT INTO treatments (name, duration_minutes, price_from, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT (name) DO NOTHING',
            [t.name, t.duration_minutes, t.price_from, t.sort_order]
          );
        }
      }
    })();
  }
  return schemaReady;
}
