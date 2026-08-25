'use client';

import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar" id="navbar">
      <div className="nav-inner">
        <a href="#top" className="brand">
          In2<span>Hairstyle</span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          <a href="#over-ons" onClick={() => setOpen(false)}>
            Over ons
          </a>
          <a href="#diensten" onClick={() => setOpen(false)}>
            Diensten
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="nav-right">
          <a href="/afspraak" className="btn btn-primary nav-cta">
            Maak afspraak
          </a>
          <button
            className="burger"
            aria-label="Menu openen"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
