import { Pool } from 'pg';

const globalForPg = globalThis;

export const pool =
  globalForPg._pgPool ||
  new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10000 });

if (process.env.NODE_ENV !== 'production') {
  globalForPg._pgPool = pool;
}

const DEFAULT_TREATMENTS = [
  { name: 'Knippen', duration_minutes: 30, price_from: 22, sort_order: 1 },
  { name: 'Baard', duration_minutes: 20, price_from: 15, sort_order: 2 },
  { name: 'Knippen + Baard', duration_minutes: 30, price_from: 29, sort_order: 3 },
  { name: 'Knippen kind (t/m 12 jaar)', duration_minutes: 30, price_from: 19, sort_order: 4 },
];

let schemaReady = null;

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

// Tabellen aanmaken en behandelingen bijwerken in één round trip naar de database.
const SCHEMA_SQL = `
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

  -- Nieuwe behandelingen toevoegen en duur en prijs van bestaande gelijktrekken met DEFAULT_TREATMENTS.
  INSERT INTO treatments (name, duration_minutes, price_from, sort_order) VALUES
  ${DEFAULT_TREATMENTS.map(
    (t) => `(${sqlString(t.name)}, ${Number(t.duration_minutes)}, ${Number(t.price_from)}, ${Number(t.sort_order)})`
  ).join(',\n  ')}
  ON CONFLICT (name) DO UPDATE
  SET duration_minutes = EXCLUDED.duration_minutes, price_from = EXCLUDED.price_from
  WHERE treatments.duration_minutes IS DISTINCT FROM EXCLUDED.duration_minutes
     OR treatments.price_from IS DISTINCT FROM EXCLUDED.price_from;
`;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = pool.query(SCHEMA_SQL).catch((err) => {
      // Bij een fout de volgende aanvraag opnieuw laten proberen.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}
