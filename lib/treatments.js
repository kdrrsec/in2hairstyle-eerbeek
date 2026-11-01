import { pool, ensureSchema } from '@/lib/db';

export async function getTreatments() {
  await ensureSchema();
  const { rows } = await pool.query(
    'SELECT id, name, duration_minutes, price_from FROM treatments ORDER BY sort_order ASC'
  );
  return rows;
}
