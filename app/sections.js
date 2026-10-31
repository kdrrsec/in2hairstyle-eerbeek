import Link from 'next/link';
import Navbar from './Navbar';
import { SALON, SITE_URL, hours, navLinks, services } from '@/lib/site';

function ServiceIcon({ icon }) {
  if (icon === 'scissors') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }
  return <span className="icon-mask" style={{ '--icon': `url('${icon}')` }} />;
}

// Op de homepage is de sectietitel een h2, op de eigen pagina de h1.
export function OverOns({ heading: Heading = 'h2' }) {
  return (
    <section className="hx-section hx-sand" id="over-ons">
      <div className="hx-wrap hx-salon">
        <div className="hx-hexlogo" aria-hidden="true">
          <div className="hx-hexlogo-inner">
            <img src="/logo.png" alt="" />
          </div>
        </div>
        <div className="hx-salon-text">
          <p className="hx-label">Over ons</p>
          <Heading>Kapsalon in Eerbeek</Heading>
          <p>
            In2Hairstyle is een kapsalon voor dames, heren en kinderen aan de Coldenhovenseweg in
            Eerbeek.
          </p>
          <p>
            Je kunt bij ons terecht om te knippen en voor je baard. Een afspraak maak je online, maar
            je mag ook gewoon binnenlopen.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Prijzen({ heading: Heading = 'h2' }) {
  return (
    <section className="hx-section hx-dark" id="prijzen">
      <div className="hx-hero-pattern hx-pattern-soft" aria-hidden="true"></div>
      <div className="hx-wrap">
        <div className="hx-head">
          <div>
            <p className="hx-label">Behandelingen &amp; prijzen</p>
            <Heading>Kies je behandeling</Heading>
          </div>
          <p>Klik op een behandeling en plan direct een moment dat jou uitkomt.</p>
        </div>
        <div className="hx-services">
          {services.map((s) => (
            <Link key={s.name} href="/afspraak" className="hx-service">
              <div className="hx-service-top">
                <span className="hx-service-icon">
                  <ServiceIcon icon={s.icon} />
                </span>
                <span className="hx-service-dur">{s.duration}</span>
              </div>
              <h3>
                {s.name}
                {s.note && <small>{s.note}</small>}
              </h3>
              <p>{s.desc}</p>
              <div className="hx-service-bottom">
                <span className="hx-service-price">{s.price}</span>
                <span className="hx-service-go">Boeken</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ heading: Heading = 'h2' }) {
  return (
    <section className="hx-section" id="contact">
      <div className="hx-wrap">
        <div className="hx-head">
          <div>
            <p className="hx-label">Contact</p>
            <Heading>Langskomen in Eerbeek</Heading>
          </div>
          <p>Bel ons gerust, of plan zelf online een afspraak in.</p>
        </div>
        <div className="hx-contact">
          <div className="hx-contact-cards">
            <div className="hx-card">
              <h3>{SALON.name}</h3>
              <address>
                <p>
                  {SALON.street}
                  <br />
                  {SALON.postalCode} {SALON.city}
                </p>
                <p>
                  <a href={`tel:${SALON.phoneIntl}`} className="hx-link">
                    {SALON.phone}
                  </a>
                </p>
              </address>
              <div className="hx-actions">
                <Link href="/afspraak" className="hx-btn hx-btn-copper">
                  Afspraak plannen
                </Link>
                <a href={SALON.routeUrl} target="_blank" rel="noopener noreferrer" className="hx-btn hx-btn-ink">
                  Route
                </a>
              </div>
            </div>
            <div className="hx-card">
              <h3>Openingstijden</h3>
              <dl className="hx-hours">
                {hours.map(([day, , open, close]) => (
                  <div key={day} className={open ? '' : 'closed'}>
                    <dt>{day}</dt>
                    <dd>{open ? `${open} – ${close}` : 'Gesloten'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="hx-map">
            <iframe
              title="Locatie In2Hairstyle Eerbeek"
              src="https://www.google.com/maps?q=Coldenhovenseweg+6a,+6961+ED+Eerbeek&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hx-footer">
      <div className="hx-wrap hx-footer-grid">
        <Link href="/" className="hx-footer-brand">
          <img src="/logo.png" alt="In2Hairstyle" />
        </Link>
        <nav className="hx-footer-nav">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href="/afspraak">Afspraak</Link>
        </nav>
        <div className="hx-footer-social">
          <a href={SALON.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={SALON.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="hx-wrap hx-footer-bottom">
        <p>&copy; {year} In2Hairstyle Eerbeek</p>
      </div>
    </footer>
  );
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

// Layout voor /over-ons, /prijzen en /contact.
export function SubPage({ name, path, children }) {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="home">{children}</main>
      <Footer />
      <JsonLd data={breadcrumbs} />
    </>
  );
}
