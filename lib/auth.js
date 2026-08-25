import crypto from 'crypto';

const SESSION_COOKIE = 'admin_session';

function sign(value) {
  const secret = process.env.ADMIN_PASSWORD || 'fallback-secret';
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export function createSessionValue() {
  const payload = String(Date.now());
  return `${payload}.${sign(payload)}`;
}

export function isValidSession(cookieValue) {
  if (!cookieValue) return false;
  const [payload, sig] = cookieValue.split('.');
  if (!payload || !sig) return false;
  return sign(payload) === sig;
}

export const ADMIN_COOKIE_NAME = SESSION_COOKIE;
