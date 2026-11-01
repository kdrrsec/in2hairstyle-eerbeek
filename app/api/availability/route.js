import { NextResponse } from 'next/server';
import { pool, ensureSchema } from '@/lib/db';
import { computeAvailableSlots, dayBoundsUTC } from '@/lib/schedule';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS = 31;

function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

// ?treatmentId=1&date=2026-11-03            -> { slots: [...] }
// ?treatmentId=1&from=2026-11-03&days=14    -> { days: { '2026-11-03': [...], ... } }
export async function GET(request) {
  const t0 = performance.now();
  await ensureSchema();
  const { searchParams } = new URL(request.url);
  const single = searchParams.get('date');
  const from = single || searchParams.get('from');
  const count = single ? 1 : Math.min(Number(searchParams.get('days')) || 1, MAX_DAYS);
  const treatmentId = Number(searchParams.get('treatmentId'));

  if (!from || !DATE_RE.test(from) || !treatmentId || count < 1) {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const dates = Array.from({ length: count }, (_, i) => addDays(from, i));
  const rangeStart = dayBoundsUTC(dates[0]).start;
  const rangeEnd = dayBoundsUTC(dates[dates.length - 1]).end;

  const [{ rows: treatmentRows }, { rows: busyRows }] = await Promise.all([
    pool.query('SELECT duration_minutes FROM treatments WHERE id = $1', [treatmentId]),
    pool.query(
      `SELECT start_time, end_time FROM appointments
       WHERE status != 'cancelled' AND start_time < $2 AND end_time > $1
       UNION ALL
       SELECT start_time, end_time FROM blocked_slots
       WHERE start_time < $2 AND end_time > $1`,
      [rangeStart.toISOString(), rangeEnd.toISOString()]
    ),
  ]);
  if (treatmentRows.length === 0) {
    return NextResponse.json({ error: 'Behandeling niet gevonden' }, { status: 404 });
  }
  const duration = treatmentRows[0].duration_minutes;

  const busyIntervals = busyRows.map((r) => ({
    start: new Date(r.start_time),
    end: new Date(r.end_time),
  }));

  const headers = { 'Server-Timing': `db;dur=${Math.round(performance.now() - t0)}` };

  if (single) {
    return NextResponse.json({ slots: computeAvailableSlots(single, duration, busyIntervals) }, { headers });
  }

  const days = {};
  for (const date of dates) {
    days[date] = computeAvailableSlots(date, duration, busyIntervals);
  }
  return NextResponse.json({ days }, { headers });
}
