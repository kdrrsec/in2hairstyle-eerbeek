'use client';

import { useEffect, useMemo, useState } from 'react';

function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value
  );
}

function toDateStr(d) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(d);
}

function buildDays(count) {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    days.push({
      dateStr: toDateStr(d),
      dayNum: new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', day: 'numeric' }).format(d),
      weekday: new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', weekday: 'short' })
        .format(d)
        .toUpperCase(),
    });
  }
  return days;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

function timeIsEvening(timeStr) {
  const hour = Number(timeStr.split(':')[0]);
  return hour >= 17;
}

function formatDateLabel(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'Europe/Amsterdam',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(dt);
}

const STEPS = [
  { key: 'service', label: 'Dienst' },
  { key: 'time', label: 'Tijd' },
  { key: 'details', label: 'Gegevens' },
  { key: 'done', label: 'Klaar' },
];

export default function AfspraakPage() {
  const [step, setStep] = useState('service');
  const [treatments, setTreatments] = useState([]);
  const [treatmentId, setTreatmentId] = useState(null);

  const allDays = useMemo(() => buildDays(60), []);
  const [visibleDayCount, setVisibleDayCount] = useState(14);
  const days = allDays.slice(0, visibleDayCount);
  const [selectedDate, setSelectedDate] = useState(allDays[0].dateStr);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    fetch('/api/treatments')
      .then((r) => r.json())
      .then((data) => setTreatments(data.treatments || []));
  }, []);

  useEffect(() => {
    if (step !== 'time' || !treatmentId) return;
    setLoadingSlots(true);
    setTime(null);
    fetch(`/api/availability?treatmentId=${treatmentId}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .finally(() => setLoadingSlots(false));
  }, [step, treatmentId, selectedDate]);

  const selectedTreatment = treatments.find((t) => t.id === treatmentId);
  const maxStepIndex = confirmed
    ? 3
    : time
    ? 2
    : treatmentId
    ? 1
    : 0;

  function goTo(stepKey) {
    const idx = STEPS.findIndex((s) => s.key === stepKey);
    if (idx <= maxStepIndex && stepKey !== 'done') setStep(stepKey);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim()) {
      setError('Vul je naam en telefoonnummer in.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ treatmentId, date: selectedDate, time, name, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Er ging iets mis. Probeer het opnieuw.');
        if (res.status === 409) {
          setTime(null);
          setStep('time');
          fetch(`/api/availability?treatmentId=${treatmentId}&date=${selectedDate}`)
            .then((r) => r.json())
            .then((d) => setSlots(d.slots || []));
        }
        return;
      }
      setConfirmed({ date: selectedDate, time, treatment: selectedTreatment });
      setStep('done');
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="booking-page">
      <a href="/" className="brand booking-brand">
        In2<span>Hairstyle</span>
      </a>

      <div className="booking-shell">
        <nav className="stepper">
          {STEPS.map((s, i) => (
            <span key={s.key} className="stepper-item">
              {i > 0 && <span className="stepper-sep">›</span>}
              <button
                type="button"
                className={`stepper-btn${step === s.key ? ' active' : ''}${i <= maxStepIndex ? ' enabled' : ''}`}
                onClick={() => goTo(s.key)}
                disabled={i > maxStepIndex}
              >
                {s.label}
              </button>
            </span>
          ))}
        </nav>

        <div className="booking-grid">
          <div className="booking-main">
            {step === 'service' && (
              <div className="booking-panel">
                <h1>Kies een dienst</h1>
                <div className="service-grid">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`service-card${treatmentId === t.id ? ' selected' : ''}`}
                      onClick={() => {
                        setTreatmentId(t.id);
                      }}
                    >
                      {treatmentId === t.id && <span className="service-check">✓</span>}
                      <span className="service-name">{t.name}</span>
                      <span className="service-duration">{t.duration_minutes} min</span>
                      <span className="service-price">€{formatEuro(t.price_from)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'time' && (
              <div className="booking-panel">
                <div className="panel-header-row">
                  <h1>Kies dag en tijd</h1>
                  <button type="button" className="today-btn" onClick={() => setSelectedDate(allDays[0].dateStr)}>
                    Vandaag
                  </button>
                </div>
                <div className="day-picker">
                  {days.map((d) => (
                    <div key={d.dateStr} className="day-col">
                      <button
                        type="button"
                        className={`day-circle${selectedDate === d.dateStr ? ' selected' : ''}`}
                        onClick={() => setSelectedDate(d.dateStr)}
                      >
                        {d.dayNum}
                      </button>
                      <span className="day-col-label">{d.weekday}</span>
                    </div>
                  ))}
                  {visibleDayCount < allDays.length && (
                    <div className="day-col">
                      <button
                        type="button"
                        className="day-circle day-more"
                        onClick={() => setVisibleDayCount((c) => Math.min(c + 14, allDays.length))}
                      >
                        +
                      </button>
                      <span className="day-col-label">Meer</span>
                    </div>
                  )}
                </div>

                {loadingSlots && <p className="muted">Beschikbare tijden laden…</p>}
                {!loadingSlots && slots.length === 0 && (
                  <p className="muted">Geen beschikbare tijden op deze dag. Kies een andere datum.</p>
                )}
                {!loadingSlots && slots.length > 0 && (
                  <div className="slot-grid">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`slot-btn${time === s ? ' selected' : ''}`}
                        onClick={() => {
                          setTime(s);
                          setStep('details');
                        }}
                      >
                        <span className="slot-icon">{timeIsEvening(s) ? <MoonIcon /> : <SunIcon />}</span>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 'details' && (
              <div className="booking-panel">
                <h1>Laatste stap — jouw gegevens</h1>
                <form onSubmit={handleSubmit} className="details-form">
                  <label className="field">
                    <span>Naam *</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Voor- en achternaam" required />
                  </label>
                  <label className="field">
                    <span>Telefoonnummer *</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" required />
                  </label>
                  {error && <p className="form-error">{error}</p>}
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Bezig…' : 'Afspraak bevestigen'}
                  </button>
                  <p className="details-note">We nemen alleen contact op als er iets wijzigt aan je afspraak.</p>
                </form>
              </div>
            )}

            {step === 'done' && confirmed && (
              <div className="booking-panel booking-confirm">
                <div className="confirm-icon">✓</div>
                <h1>Afspraak bevestigd</h1>
                <p>
                  Je afspraak voor <strong>{confirmed.treatment?.name}</strong> op{' '}
                  <strong>{formatDateLabel(confirmed.date)}</strong> om <strong>{confirmed.time}</strong> uur is
                  ingepland.
                </p>
                <p className="confirm-note">
                  Moet je verzetten of annuleren? Bel ons gerust op <a href="tel:+31313410693">0313 410 693</a>.
                </p>
                <a href="/" className="btn btn-primary">
                  Terug naar de website
                </a>
              </div>
            )}
          </div>

          <aside className="order-summary">
            <h2>Jouw afspraak</h2>
            <p className="order-shop">In2Hairstyle</p>

            {!selectedTreatment && <p className="muted">Nog geen dienst gekozen.</p>}

            {selectedTreatment && (
              <div className="order-line">
                <div>
                  <div className="order-line-name">{selectedTreatment.name}</div>
                  {time && <div className="order-line-meta">{formatDateLabel(selectedDate)} · {time}</div>}
                </div>
                <div className="order-line-price">€{formatEuro(selectedTreatment.price_from)}</div>
              </div>
            )}

            {selectedTreatment && (
              <div className="order-subtotal">
                <span>Subtotaal</span>
                <span>€{formatEuro(selectedTreatment.price_from)}</span>
              </div>
            )}

            {step === 'service' && treatmentId && (
              <button type="button" className="btn btn-primary order-cta" onClick={() => setStep('time')}>
                Kies een tijd
              </button>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
