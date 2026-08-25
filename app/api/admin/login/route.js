import { NextResponse } from 'next/server';
import { createSessionValue, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const password = body?.password || '';

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
