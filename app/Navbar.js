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

  // Ankerlinks laten scrollen zonder #sectie in de adresbalk.
  useEffect(() => {
    function clearHash() {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    function scrollToId(id, behavior) {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior });
        return true;
      }
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior });
      return true;
    }

    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      if (scrollToId(link.getAttribute('href').slice(1), 'smooth')) {
        e.preventDefault();
        clearHash();
      }
    }

    // Oude links met #sectie: naar de sectie scrollen en de hash weghalen.
    if (window.location.hash) {
      scrollToId(decodeURIComponent(window.location.hash.slice(1)), 'auto');
      // Na de router-initialisatie, anders zet Next de hash terug.
      setTimeout(clearHash, 0);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

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
            <a href="#over-ons">Over ons</a>
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
          <a href="#over-ons" onClick={close}>
            Over ons
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
