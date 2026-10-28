'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <header className="hx-nav">
        <div className="hx-wrap hx-nav-inner">
          <a href="#top" className="hx-nav-brand" onClick={close}>
            <img src="/logo.png" alt="In2Hairstyle" />
          </a>
          <nav className="hx-nav-links">
            <a href="#salon">Salon</a>
            <a href="#prijzen">Prijzen</a>
            <a href="#contact">Contact</a>
            <a href="/afspraak" className="hx-btn hx-btn-copper hx-btn-sm">
              Afspraak plannen
            </a>
          </nav>
          <button
            className={`hx-burger${open ? ' open' : ''}`}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={`hx-nav-mobile${open ? ' open' : ''}`}>
          <a href="#salon" onClick={close}>
            Salon
          </a>
          <a href="#prijzen" onClick={close}>
            Prijzen
          </a>
          <a href="#contact" onClick={close}>
            Contact
          </a>
          <a href="/afspraak" className="hx-btn hx-btn-copper" onClick={close}>
            Afspraak plannen
          </a>
        </nav>
      </header>

      <div className={`hx-backdrop${open ? ' open' : ''}`} onClick={close} aria-hidden="true"></div>
    </>
  );
}
