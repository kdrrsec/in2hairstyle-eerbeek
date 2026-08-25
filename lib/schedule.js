const TIMEZONE = 'Europe/Amsterdam';

// 0 = Sunday ... 6 = Saturday
export const BUSINESS_HOURS = {
  0: null,
  1: null,
  2: { open: '09:30', close: '18:00' },
  3: { open: '09:30', close: '18:00' },
  4: { open: '09:30', close: '18:00' },
  5: { open: '09:30', close: '20:00' },
  6: { open: '09:30', close: '18:00' },
};

const SLOT_STEP_MINUTES = 15;
const MIN_LEAD_MINUTES = 30;

function getOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' });
  const part = dtf.formatToParts(date).find((p) => p.type === 'timeZoneName')?.value || 'GMT+1';
  const match = part.match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 60;
  const sign = match[1] === '-' ? -1 : 1;
  const hours = parseInt(match[2], 10);
  const mins = match[3] ? parseInt(match[3], 10) : 0;
  return sign * (hours * 60 + mins);
}

export function localToUTC(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  const naiveUTC = new Date(Date.UTC(y, m - 1, d, hh, mm));
  const offset = getOffsetMinutes(naiveUTC, TIMEZONE);
  return new Date(naiveUTC.getTime() - offset * 60000);
}

export function toAmsterdamTimeStr(date) {
  return new Intl.DateTimeFormat('nl-NL', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function weekdayForDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d, 12));
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'short' }).format(probe);
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[wd];
}

export function dayBoundsUTC(dateStr) {
  const start = localToUTC(dateStr, '00:00');
  const [y, m, d] = dateStr.split('-').map(Number);
  const nextDay = new Date(Date.UTC(y, m - 1, d + 1, 0, 0));
  const nextDateStr = nextDay.toISOString().slice(0, 10);
  const end = localToUTC(nextDateStr, '00:00');
  return { start, end };
}

function timeStrToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function computeAvailableSlots(dateStr, durationMinutes, busyIntervals, now = new Date()) {
  const weekday = weekdayForDate(dateStr);
  const hours = BUSINESS_HOURS[weekday];
  if (!hours) return [];

  const openMin = timeStrToMinutes(hours.open);
  const closeMin = timeStrToMinutes(hours.close);

  const slots = [];
  for (let m = openMin; m + durationMinutes <= closeMin; m += SLOT_STEP_MINUTES) {
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    const timeStr = `${hh}:${mm}`;
    const start = localToUTC(dateStr, timeStr);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    if (start.getTime() < now.getTime() + MIN_LEAD_MINUTES * 60000) continue;

    const overlaps = busyIntervals.some(
      (b) => start.getTime() < b.end.getTime() && end.getTime() > b.start.getTime()
    );
    if (!overlaps) slots.push(timeStr);
  }
  return slots;
}
