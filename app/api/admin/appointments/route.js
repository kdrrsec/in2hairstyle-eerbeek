import { NextResponse } from 'next/server';
import { pool, ensureSchema } from '@/lib/db';
import { isValidSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

function requireAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidSession(cookie);
}

export async function GET(request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }
  await ensureSchema();
  const { rows } = await pool.query(
    `SELECT a.id, a.customer_name, a.customer_phone, a.customer_email,
            a.start_time, a.end_time, a.status, t.name AS treatment_name
     FROM appointments a
     JOIN treatments t ON t.id = a.treatment_id
     WHERE a.end_time > now() - interval '1 day'
     ORDER BY a.start_time ASC`
  );
  return NextResponse.json({ appointments: rows });
}

export async function DELETE(request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  if (!id) {
    return NextResponse.json({ error: 'Ongeldig ID' }, { status: 400 });
  }
  await ensureSchema();
  await pool.query("UPDATE appointments SET status = 'cancelled' WHERE id = $1", [id]);
  return NextResponse.json({ ok: true });
}
