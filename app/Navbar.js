'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Oude links zoals /#over-ons doorsturen naar /over-ons.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const link = navLinks.find((l) => l.href === `/${hash}`);
    if (link) {
      router.replace(link.href);
    } else if (hash === 'top') {
      // Na de router-initialisatie, anders zet Next de hash terug.
      setTimeout(() => history.replaceState(null, '', window.location.pathname), 0);
    }
  }, [router]);

  function close() {
    setOpen(false);
  }

  function linkProps(href) {
    return { href, 'aria-current': pathname === href ? 'page' : undefined };
  }

  return (
    <>
      <header className="hx-nav">
        <div className="hx-wrap hx-nav-inner">
          <Link href="/" className="hx-nav-brand" onClick={close}>
            <img src="/logo.png" alt="In2Hairstyle" />
          </Link>
          <nav className="hx-nav-links">
            {navLinks.map((l) => (
              <Link key={l.href} {...linkProps(l.href)}>
                {l.label}
              </Link>
            ))}
            <Link href="/afspraak" className="hx-btn hx-btn-copper hx-btn-sm">
              Afspraak plannen
            </Link>
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
          {navLinks.map((l) => (
            <Link key={l.href} {...linkProps(l.href)} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link href="/afspraak" className="hx-btn hx-btn-copper" onClick={close}>
            Afspraak plannen
          </Link>
        </nav>
      </header>

      <div className={`hx-backdrop${open ? ' open' : ''}`} onClick={close} aria-hidden="true"></div>
    </>
  );
}
