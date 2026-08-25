import { NextResponse } from 'next/server';
import { pool, ensureSchema } from '@/lib/db';
import { localToUTC } from '@/lib/schedule';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export async function POST(request) {
  await ensureSchema();
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const { treatmentId, date, time, name, phone, email } = body;

  if (
    !treatmentId ||
    !date ||
    !time ||
    !DATE_RE.test(date) ||
    !TIME_RE.test(time) ||
    !name?.trim() ||
    !phone?.trim()
  ) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 });
  }

  const { rows: treatmentRows } = await pool.query(
    'SELECT duration_minutes FROM treatments WHERE id = $1',
    [treatmentId]
  );
  if (treatmentRows.length === 0) {
    return NextResponse.json({ error: 'Behandeling niet gevonden' }, { status: 404 });
  }
  const duration = treatmentRows[0].duration_minutes;

  const start = localToUTC(date, time);
  const end = new Date(start.getTime() + duration * 60000);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: conflicts } = await client.query(
      `SELECT id FROM appointments
       WHERE status != 'cancelled' AND start_time < $2 AND end_time > $1
       FOR UPDATE`,
      [start.toISOString(), end.toISOString()]
    );
    if (conflicts.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json(
        { error: 'Dit tijdstip is helaas net vergeven. Kies een andere tijd.' },
        { status: 409 }
      );
    }

    const { rows } = await client.query(
      `INSERT INTO appointments (treatment_id, customer_name, customer_phone, customer_email, start_time, end_time)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      [treatmentId, name.trim(), phone.trim(), email?.trim() || null, start.toISOString(), end.toISOString()]
    );
    await client.query('COMMIT');

    return NextResponse.json({ id: rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
