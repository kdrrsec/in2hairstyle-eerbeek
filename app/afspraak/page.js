'use client';

import { useEffect, useMemo, useState } from 'react';

function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value
  );
}

function todayStr() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
}

function maxDateStr() {
  const d = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(d);
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

export default function AfspraakPage() {
  const [treatments, setTreatments] = useState([]);
  const [treatmentId, setTreatmentId] = useState(null);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  const min = useMemo(() => todayStr(), []);
  const max = useMemo(() => maxDateStr(), []);

  useEffect(() => {
    fetch('/api/treatments')
      .then((r) => r.json())
      .then((data) => setTreatments(data.treatments || []));
  }, []);

  useEffect(() => {
    if (!treatmentId || !date) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    setTime(null);
    fetch(`/api/availability?treatmentId=${treatmentId}&date=${date}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .finally(() => setLoadingSlots(false));
  }, [treatmentId, date]);

  const selectedTreatment = treatments.find((t) => t.id === treatmentId);
  const step = !treatmentId ? 1 : !time ? 2 : 3;

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
        body: JSON.stringify({ treatmentId, date, time, name, phone, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Er ging iets mis. Probeer het opnieuw.');
        if (res.status === 409) {
          setTime(null);
          fetch(`/api/availability?treatmentId=${treatmentId}&date=${date}`)
            .then((r) => r.json())
            .then((d) => setSlots(d.slots || []));
        }
        return;
      }
      setConfirmed({ date, time, treatment: selectedTreatment });
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <main className="booking-page">
        <a href="/" className="brand booking-brand">
          In2<span>Hairstyle</span>
        </a>
        <div className="booking-card booking-confirm">
          <div className="confirm-icon">✓</div>
          <h1>Afspraak bevestigd</h1>
          <p>
            Je afspraak voor <strong>{confirmed.treatment?.name}</strong> op{' '}
            <strong>{formatDateLabel(confirmed.date)}</strong> om{' '}
            <strong>{confirmed.time}</strong> uur is ingepland.
          </p>
          <p className="confirm-note">
            Moet je verzetten of annuleren? Bel ons gerust op{' '}
            <a href="tel:+31313410693">0313 410 693</a>.
          </p>
          <a href="/" className="btn btn-primary">
            Terug naar de website
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <a href="/" className="brand booking-brand">
        In2<span>Hairstyle</span>
      </a>
      <div className="booking-card">
        <p className="eyebrow">Online afspraak maken</p>
        <h1>Plan je bezoek</h1>

        <div className="booking-step">
          <h2>1. Kies een behandeling</h2>
          <div className="treatment-grid">
            {treatments.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`treatment-option${treatmentId === t.id ? ' selected' : ''}`}
                onClick={() => setTreatmentId(t.id)}
              >
                <span className="treatment-name">{t.name}</span>
                <span className="treatment-meta">
                  {t.duration_minutes} min · vanaf €{formatEuro(t.price_from)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {treatmentId && (
          <div className="booking-step">
            <h2>2. Kies een datum</h2>
            <input
              type="date"
              className="date-input"
              min={min}
              max={max}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {date && (
              <div className="slots-wrap">
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
                        onClick={() => setTime(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <form className="booking-step" onSubmit={handleSubmit}>
            <h2>3. Jouw gegevens</h2>
            <div className="booking-summary">
              {selectedTreatment?.name} · {formatDateLabel(date)} om {time} uur
            </div>
            <label className="field">
              <span>Naam *</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label className="field">
              <span>Telefoonnummer *</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            <label className="field">
              <span>E-mail (optioneel)</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Bezig…' : 'Afspraak bevestigen'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
