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
    <header className="navbar" id="navbar">
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={close}>
          <img src="/logo.png" alt="In2Hairstyle" className="brand-logo" />
        </a>
        <nav className="nav-links">
          <a href="#over-ons">Over ons</a>
          <a href="#diensten">Diensten</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-right">
          <a href="/afspraak" className="btn btn-primary nav-cta">
            Maak afspraak
          </a>
          <button
            className={`burger${open ? ' open' : ''}`}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`nav-backdrop${open ? ' open' : ''}`} onClick={close} aria-hidden="true"></div>
      <nav className={`nav-mobile${open ? ' open' : ''}`}>
        <a href="#over-ons" onClick={close}>
          Over ons
        </a>
        <a href="#diensten" onClick={close}>
          Diensten
        </a>
        <a href="#contact" onClick={close}>
          Contact
        </a>
        <a href="/afspraak" className="btn btn-primary nav-mobile-cta" onClick={close}>
          Maak afspraak
        </a>
      </nav>
    </header>
  );
}
